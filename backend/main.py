from datetime import datetime

from cleverminer import *
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from typing import List, Optional
import uvicorn
import pandas as pd
import json
import io
import os

from matplotlib.pyplot import title

from src.classes import DatasetProcessed, Metadata, Category, AttributeData, ResultAttribute, CFRule, CFResults, \
    CFConditionAttribute, CFProcedure
from src.parsers import parse_clm_quantifiers

# Create FastAPI instance
app = FastAPI(title="CleverMiner API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/upload", response_model=DatasetProcessed)
async def upload_csv(file: UploadFile = File(...)):
    try:
        # Read uploaded file
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # Metadata
        metadata = Metadata(
            name=file.filename,
            format='csv',
            size=len(contents),
            rows=len(df),
            columns=len(df.columns),
            date=datetime.now(),
            hiddenAttributes=[]  # Add logic to determine if needed
        )

        # Process columns
        data = []
        for column in df.columns:
            value_counts = df[column].astype(str).value_counts().to_dict()
            categories = [Category(label=k, count=v) for k, v in value_counts.items()]
            data.append(AttributeData(title=column, categories=categories))

        return DatasetProcessed(data=data, metadata=metadata)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/cf-process", response_model=CFResults)
async def process_cf(data: str = Form(...), file: UploadFile = File(...)):
    # print(procedure)
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # Construct cond['attributes'] from frontend input
        procedure_dict = json.loads(data)
        procedure = CFProcedure.model_validate(procedure_dict)

        cond_attributes = []
        for attr in procedure.condition.conditionAttributes:
            cond_attributes.append({
                'name': attr.attribute,
                'type': attr.type,  # 'seq' or 'subset'
                'minlen': attr.range.start, 'maxlen': attr.range.end,

            })

        cf_quantifiers = {}
        for quantifier in procedure.quantifiers:
            cf_quantifiers[quantifier.quantifier] = quantifier.value

        # Call cleverminer
        clm = cleverminer(
            df=df,
            target=procedure.condition.targetAttribute,  # Use actual target from your dataset
            proc='CFMiner',
            quantifiers=cf_quantifiers,
            cond={
                'attributes': cond_attributes,
                'minlen': procedure.range.start,
                'maxlen': procedure.range.end,
                "type": "con" if procedure.conjunction else "dis"
            }
        )

        # print(clm.rulelist())

        count = clm.get_rulecount()

        # Extract results
        rules = []

        target_val_cat = clm.get_dataset_category_list( procedure.condition.targetAttribute)

        for i in range(1, count + 1):
            parsed_quantifiers = parse_clm_quantifiers(clm.get_quantifiers(i))
            attributes_no_cat = clm.get_rule_variables(i, 'cond')
            histogram_data = [Category(label=label, count=count) for (label, count) in zip(target_val_cat, clm.get_hist(i))]

            attributes = [
                ResultAttribute(
                    title=attribute,
                    selectedCategories=clm.get_rule_categories(i, 'cond', attribute)
                )
                for attribute in attributes_no_cat
            ]

            rules.append(CFRule(
                attributes=attributes,
                histogramData=histogram_data,
                quantifiers=parsed_quantifiers
            ))

        return CFResults(
            targetAttribute=procedure.condition.targetAttribute,
            conjunction=procedure.conjunction,
            rules=rules
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


# Run server
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
