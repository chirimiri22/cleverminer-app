import io
from contextlib import redirect_stdout
from typing import List

import numpy as np
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




def prepare_string_series(series: pd.Series):
    """
    Převede stringový sloupec na číselný podle abecedy a připraví mapování zpět.
    Vrací: numeric_series, inverse_mapping
    """
    sorted_unique = sorted(series.unique())
    mapping = {val: i for i, val in enumerate(sorted_unique)}
    inverse_mapping = {i: val for val, i in mapping.items()}
    numeric_series = series.map(mapping)
    return numeric_series, inverse_mapping

def equal_width_bins(series: pd.Series, n_bins: int) -> pd.Series:
    """
    Rozdělení do ekvidistantních skupin s textovými labely 'start – end'.
    """
    if series.dtype == object or isinstance(series.iloc[0], str):
        numeric, inverse = prepare_string_series(series)
        cut = pd.cut(numeric, bins=n_bins, duplicates='drop')
        labels = [f"{inverse[int(edge.left)]} – {inverse[int(edge.right) - 1]}"
                  for edge in cut.cat.categories]
        return pd.cut(numeric, bins=n_bins, labels=labels, duplicates='drop')
    else:
        cut = pd.cut(series, bins=n_bins, duplicates='drop')
        labels = [f"{round(edge.left, 2)} – {round(edge.right, 2)}"
                  for edge in cut.cat.categories]
        return pd.cut(series, bins=n_bins, labels=labels, duplicates='drop')

def equal_freq_bins(series: pd.Series, n_bins: int) -> pd.Series:
    """
    Rozdělení do ekvifrekventních skupin s textovými labely 'start – end'.
    """
    if series.dtype == object or isinstance(series.iloc[0], str):
        numeric, inverse = prepare_string_series(series)
        try:
            cut = pd.qcut(numeric, q=n_bins, duplicates='drop')
        except ValueError:
            return pd.Series([np.nan] * len(series))
        labels = [f"{inverse[int(edge.left)]} – {inverse[int(edge.right) - 1]}"
                  for edge in cut.cat.categories]
        return pd.qcut(numeric, q=n_bins, labels=labels, duplicates='drop')
    else:
        try:
            cut = pd.qcut(series, q=n_bins, duplicates='drop')
        except ValueError:
            return pd.Series([np.nan] * len(series))
        labels = [f"{round(edge.left, 2)} – {round(edge.right, 2)}"
                  for edge in cut.cat.categories]
        return pd.qcut(series, q=n_bins, labels=labels, duplicates='drop')
