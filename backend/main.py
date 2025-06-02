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
    CFConditionAttribute, CFProcedure, ClmLogs
from src.helpers import capture_output, get_ordered_categories
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
            category_names = sorted(df[column].astype(str).unique())
            categories = get_ordered_categories(category_names, df, column)
            data.append(AttributeData(title=column, categories=categories))

        return DatasetProcessed(data=data, metadata=metadata)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/cf-process", response_model=CFResults)
async def process_cf(data: str = Form(...), file: UploadFile = File(...), clm=None):
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

        target_val_cat = clm.get_dataset_category_list(procedure.condition.targetAttribute)

        for i in range(1, count + 1):
            parsed_quantifiers = parse_clm_quantifiers(clm.get_quantifiers(i))
            attributes_no_cat = clm.get_rule_variables(i, 'cond')
            histogram_data = [Category(label=label, count=count) for (label, count) in
                              zip(target_val_cat, clm.get_hist(i))]

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
        # TARGET ATTRIBUTE
        target_attribute_name = procedure.condition.targetAttribute
        ordered_target_categories = get_ordered_categories( # make sure ordering is accordin to clm miner
            clm.get_dataset_category_list(target_attribute_name), df, target_attribute_name)
        target_attribute = AttributeData(title=target_attribute_name, categories=ordered_target_categories)

        # LOGS
        summary_str = capture_output(clm.print_summary)
        rules_str = capture_output(clm.print_rulelist)

        return CFResults(
            targetAttributeHistogram=target_attribute,
            conjunction=procedure.conjunction,
            rules=rules,
            logs=ClmLogs(summary=summary_str, rulelist=rules_str)
        )

    except Exception as e:
        print(e)
    raise HTTPException(status_code=500, detail=str(e))


# Run server
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
