from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import pandas as pd
from datetime import datetime
import io
import os

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

# # Data models for POST request (already present)
# class UserData(BaseModel):
#     name: str
#     message: str

# Data models for dataset response
class Category(BaseModel):
    label: str
    count: int

class AttributeData(BaseModel):
    title: str
    categories: List[Category]

class Metadata(BaseModel):
    name: str
    format: str
    size: int
    rows: int
    columns: int
    date: datetime
    hiddenAttributes: Optional[List[str]] = None

class DatasetProcessed(BaseModel):
    data: List[AttributeData]
    metadata: Metadata

# Submit endpoint (already present)

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

# Run server
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
