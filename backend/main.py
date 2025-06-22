import asyncio
import csv
from datetime import datetime

from cleverminer import cleverminer
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
import pandas as pd
import json
import io

from starlette.responses import StreamingResponse, JSONResponse

from src.classes import DatasetProcessed, Metadata, Category, AttributeData, ResultAttribute, CFRule, CFResults, \
    CFProcedure, ClmLogs, Categorization, CategorizationFormData, NominalProcessingForm, \
    ReplaceMode, ReplaceRequest

from src.helpers import capture_output, get_ordered_categories, equal_width_bins, equal_freq_bins, \
    get_ordered_unique_category_names, is_numeric, count_original_values_per_bin, \
    group_counts_to_intervals, get_rule_images_base64, is_above_uniqueness_threshold, load_dataset
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


@app.get("/")
async def hello():
    return "Backend for CleverMiner App is running! Check if the frontend is running on http://localhost:3000/ ."


@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI Backend!"}


@app.post("/api/upload", response_model=DatasetProcessed)
async def upload_csv(file: UploadFile = File(...)):
    df, size = await load_dataset(file)

    try:
        # Metadata
        metadata = Metadata(
            name=file.filename,
            format='csv',
            size=size,
            rows=len(df),
            columns=len(df.columns),
            date=datetime.now()
        )

        # Process columns
        data = []
        for column in df.columns:
            contains_null = df[column].isnull().any()

            category_names = get_ordered_unique_category_names(df[column])

            categories = get_ordered_categories(category_names, df, column)
            hidden = is_above_uniqueness_threshold(len(category_names), metadata.rows)
            data.append(
                AttributeData(title=column, categories=categories, numeric=is_numeric(column, df), hidden=hidden,
                              containsNull=contains_null))

        return DatasetProcessed(data=data, metadata=metadata)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/cf-process", response_model=CFResults)
async def process_cf(data: str = Form(...),
                     file: UploadFile = File(...), clm=None):
    df, size = await load_dataset(file)
    try:
        # Construct cond['attributes'] from frontend input
        procedure_dict = json.loads(data)
        procedure = CFProcedure.model_validate(procedure_dict)

        cond_attributes = []
        for attr in procedure.condition.conditionAttributes:
            cond_attributes.append({
                'name': attr.attribute,
                'type': attr.type,
                'minlen': attr.range.start, 'maxlen': attr.range.end,

            })

        cf_quantifiers = {}
        for quantifier in procedure.quantifiers:
            cf_quantifiers[quantifier.quantifier] = quantifier.value

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    def clm_run():
        # Call cleverminer
        clm_r = cleverminer(
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
        return clm_r

    try:
        clm = await asyncio.wait_for(asyncio.to_thread(clm_run), timeout=30)
    except asyncio.TimeoutError:
        raise HTTPException(504, "This task takes longer than 30 seconds - time is up!")

    try:

        count: int = clm.get_rulecount()

        images = []
        #  Generate Images
        if procedure.generateImages:
            images = get_rule_images_base64(clm, count)

        # Extract results
        rules = []

        target_val_cat = clm.get_dataset_category_list(procedure.condition.targetAttribute)

        for i in range(1, count + 1):
            parsed_quantifiers = parse_clm_quantifiers(clm.get_quantifiers(i))
            attributes_no_cat = clm.get_rule_variables(i, 'cond')
            histogram_data = [Category(label=str(label), count=count) for (label, count) in
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
                quantifiers=parsed_quantifiers,
                imageBase64=images[i - 1] if procedure.generateImages else None

            ))
        # TARGET ATTRIBUTE
        target_attribute_name = procedure.condition.targetAttribute
        ordered_target_categories = get_ordered_categories(  # make sure ordering is accordin to clm miner
            clm.get_dataset_category_list(target_attribute_name), df, target_attribute_name)
        target_attribute = AttributeData(title=target_attribute_name, categories=ordered_target_categories,
                                         numeric=is_numeric(target_attribute_name, df), hidden=False,
                                         containsNull=False)

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
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate_categories")
async def categorize_column(data: str = Form(...), file: UploadFile = File(...), ):
    df, size = await load_dataset(file)

    try:
        form_data_dict = json.loads(data)
        form_data = CategorizationFormData.model_validate(form_data_dict)
        col = df[form_data.column]

        if form_data.categorization == Categorization.Equidistant:
            categorized = equal_width_bins(col, n_bins=form_data.categoryCount)
        else:  # Equifrequent
            categorized = equal_freq_bins(col, n_bins=form_data.categoryCount)

        result_df = df.copy()
        result_df[form_data.column] = categorized  # Overwrite column

        # Convert to CSV and return as file
        buffer = io.StringIO()
        result_df.to_csv(buffer, index=False)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=categorized.csv"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# call this after preprocessing
@app.post("/api/attribute-data")
async def get_attribute_data(
        column: str = Form(...),
        hidden: bool = Form(...),
        file: UploadFile = File(...)
):
    df, size = await load_dataset(file)

    if column not in df.columns:
        return JSONResponse(status_code=400, content={"error": f"Column '{column}' not found"})
    try:

        category_names = get_ordered_unique_category_names(df[column])
        categories = get_ordered_categories(category_names, df, column)
        contains_null = df[column].isnull().any()

        return AttributeData(
            title=column,
            categories=categories,
            numeric=is_numeric(column, df),
            hidden=False,
            containsNull=contains_null,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/preview_categories")
async def preview_categories(
        data: str = Form(...),
        file: UploadFile = File(...),
):
    df, size = await load_dataset(file)
    try:
        form_data_dict = json.loads(data)
        form_data = CategorizationFormData.model_validate(form_data_dict)
        col = form_data.column
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not pd.api.types.is_numeric_dtype(df[col]):
        raise HTTPException(status_code=400, detail="Only numeric columns are supported.")

    try:
        unique_vals_count = df[col].nunique()
        if unique_vals_count <= form_data.categoryCount:
            return {"category_group_indices": [[0, unique_vals_count - 1]]}

        # Binning
        if form_data.categorization == Categorization.Equidistant:
            categorized = equal_width_bins(df[col], n_bins=form_data.categoryCount)
        else:
            categorized = equal_freq_bins(df[col], n_bins=form_data.categoryCount)

        df["cat"] = categorized

        # Rozdělení indexů kategorií na skupiny
        category_group_counts = count_original_values_per_bin(df, col, "cat")

        category_group_intervals = group_counts_to_intervals(category_group_counts)

        # todo use classse
        return {"category_ranges": category_group_intervals}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/replace_categories")
async def replace_categories(
        data: str = Form(...),
        file: UploadFile = File(...)
):
    # Read CSV from uploaded file
    df, size = await load_dataset(file)

    try:
        # Parse JSON form data into Pydantic model
        form_data_dict = json.loads(data)
        form_data = NominalProcessingForm.model_validate(form_data_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if form_data.column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Column '{form_data.column}' not found in CSV.")

    try:
        # Build mapping dict: old_value => new_label
        mapping = {}
        for row in form_data.rows:
            new_label = row.label
            for opt in row.selectedOptions:
                mapping[opt] = new_label

        # Replace values in the column
        df_copy = df.copy()
        df_copy[form_data.column] = df_copy[form_data.column].replace(mapping)

        # Convert updated DataFrame to CSV in-memory
        buffer = io.StringIO()
        df_copy.to_csv(buffer, index=False)
        buffer.seek(0)

        # Stream CSV back as attachment
        return StreamingResponse(
            iter([buffer.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=updated_data.csv"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/replace_empty_values")
async def replace_empty_values(
        data: str = Form(...),
        file: UploadFile = File(...)
):
    try:
        # Parse form data JSON
        form_data_dict = json.loads(data)
        form_data = ReplaceRequest.model_validate(form_data_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Read CSV from uploaded file
    df, size = await load_dataset(file)

    if form_data.column not in df.columns:
        raise HTTPException(status_code=400, detail=f"Column '{form_data.column}' not found in CSV.")

    # Decide replacement value based on mode
    if form_data.replaceMode == ReplaceMode.none:
        replacement_value = "Empty Value"
    elif form_data.replaceMode == ReplaceMode.zero:
        replacement_value = 0
    elif form_data.replaceMode == ReplaceMode.false:
        replacement_value = False
    else:
        raise HTTPException(status_code=400, detail="Invalid replace_mode")

    try:
        # Replace empty values (NaN or empty strings) in the column
        df_copy = df.copy()
        # Consider empty strings too: replace both NaN and ""
        df_copy[form_data.column] = df_copy[form_data.column].replace("", pd.NA)
        df_copy[form_data.column] = df_copy[form_data.column].fillna(replacement_value)

        # Convert updated DataFrame to CSV in-memory
        buffer = io.StringIO()
        df_copy.to_csv(buffer, index=False)
        buffer.seek(0)

        # Return CSV file as response
        return StreamingResponse(
            iter([buffer.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=updated_data.csv"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
