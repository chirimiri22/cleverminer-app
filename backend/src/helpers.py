import io
from contextlib import redirect_stdout
from typing import List

import pandas as pd

from src.classes import Category


def capture_output(func, *args, **kwargs) -> str:
    buffer = io.StringIO()
    with redirect_stdout(buffer):
        func(*args, **kwargs)
    return buffer.getvalue()

def get_ordered_categories(category_names: List[str], df: pd.DataFrame, column: str) -> List[Category]:
    value_counts = df[column].astype(str).value_counts().to_dict()
    categories = [
        Category(label=name, count=value_counts.get(name, 0))
        for name in category_names
    ]
    return categories
