from enum import Enum

from pydantic import BaseModel, Field, root_validator, model_validator
from typing import List, Optional, Dict, Any
from datetime import datetime


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


# === Pydantic Models ===

class IntervalRange(BaseModel):
    start: int
    end: int


class CFQuantifier(str, Enum):
    Base = "Base"
    RelBase = "RelBase"
    S_Up = "S_Up"
    S_Down = "S_Down"
    S_Any_Up = "S_Any_Up"
    S_Any_Down = "S_Any_Down"
    Max = "Max"
    Min = "Min"
    RelMax = "RelMax"
    RelMin = "RelMin"
    RelMax_leq = "RelMax_leq"
    RelMin_leq = "RelMin_leq"


class QuantifierValue(BaseModel):
    quantifier: Optional[CFQuantifier]
    value: Optional[float]


class CFConditionAttribute(BaseModel):
    attribute: str
    type: str
    range: IntervalRange


class CFCondition(BaseModel):
    conditionAttributes: List[CFConditionAttribute]
    targetAttribute: str


class CFProcedure(BaseModel):
    range: IntervalRange
    conjunction: bool
    quantifiers: List[QuantifierValue]
    condition: CFCondition


# RESULTS

class ResultAttribute(BaseModel):
    title: str
    selectedCategories: List[str]


class CFRule(BaseModel):
    attributes: List[ResultAttribute]
    histogramData: List[Category]
    quantifiers: List[QuantifierValue]


class ClmLogs(BaseModel):
    summary: str
    rulelist: str


class CFResults(BaseModel):
    rules: List[CFRule]
    targetAttributeHistogram: AttributeData
    conjunction: bool
    logs: ClmLogs


class Categorization(str, Enum):
    Equidistant = "Equidistant"
    Equifrequent = "Equifrequent"

class CategorizationFormData(BaseModel):
    categoryCount: int
    categorization: Categorization
    column: str
