import base64
import io
from contextlib import redirect_stdout
from typing import List

import numpy as np
import pandas as pd
from matplotlib import pyplot as plt

from src.classes import Category


def capture_output(func, *args, **kwargs) -> str:
    buffer = io.StringIO()
    with redirect_stdout(buffer):
        func(*args, **kwargs)
    return buffer.getvalue()


def get_ordered_categories(ordered_category_names: List[str], df: pd.DataFrame, column: str) -> List[Category]:
    value_counts = df[column].astype(str).value_counts().to_dict()
    categories = [
        Category(label=name, count=value_counts.get(name, 0))
        for name in ordered_category_names
    ]
    return categories


def is_numeric(column: str, df: pd.DataFrame) -> bool:
    return pd.api.types.is_numeric_dtype(df[column])


def get_ordered_unique_category_names(series: pd.Series) -> list[str]:
    """Returns sorted unique values as strings.
    - If the series is numeric, sort numerically.
    - Otherwise, sort lexicographically as strings.
    """
    unique_vals = series.dropna().unique()

    if pd.api.types.is_numeric_dtype(series):
        sorted_vals = sorted(unique_vals)
    else:
        sorted_vals = sorted(map(str, unique_vals))

    return list(map(str, sorted_vals))


def equal_width_bins(series: pd.Series, n_bins: int) -> pd.Series:
    """
    Rozdělení do ekvidistantních skupin s textovými labely 'start – end'.
    Funguje pouze pro číselné sloupce.
    """
    if not pd.api.types.is_numeric_dtype(series):
        raise TypeError("equal_width_bins expects a numeric Series.")

    try:
        cut = pd.cut(series, bins=n_bins, duplicates='drop')
        labels = [f"{round(edge.left, 2)} – {round(edge.right, 2)}"
                  for edge in cut.cat.categories]
        return pd.cut(series, bins=n_bins, labels=labels, duplicates='drop')
    except ValueError:
        return pd.Series([np.nan] * len(series), index=series.index)


def equal_freq_bins(series: pd.Series, n_bins: int) -> pd.Series:
    """
    Rozdělení do ekvifrekventních skupin s textovými labely 'start – end'.
    Funguje pouze pro číselné sloupce.
    """
    if not pd.api.types.is_numeric_dtype(series):
        raise TypeError("equal_freq_bins expects a numeric Series.")

    try:
        cut = pd.qcut(series, q=n_bins, duplicates='drop')
        labels = [f"{round(edge.left, 2)} – {round(edge.right, 2)}"
                  for edge in cut.cat.categories]
        return pd.qcut(series, q=n_bins, labels=labels, duplicates='drop')
    except ValueError:
        return pd.Series([np.nan] * len(series), index=series.index)



def count_original_values_per_bin(df: pd.DataFrame, original_col: str, bin_col: str) -> list[int]:
    return (
        df.groupby(bin_col)[original_col]
        .nunique()
        .tolist()
    )


def group_counts_to_intervals(counts: list[int]) -> list[list[int]]:
    intervals = []
    start = 0
    for count in counts:
        end = start + count - 1
        intervals.append([start, end])
        start = end + 1
    return intervals

# def get_rule_image_base64(clm, rule_id: int) -> str:
#     plt.close('all')  # zavře všechna předchozí otevřená okna
#     clm.draw_rule(rule_id)  # vykreslí do aktivního figuru
#     fig = plt.gcf()  # get current figure
#     buf = io.BytesIO()
#     fig.savefig(buf, format='png')
#     buf.seek(0)
#     encoded = base64.b64encode(buf.read()).decode('utf-8')
#     plt.close(fig)  # zavře i aktuální figure
#     return encoded


def get_rule_images_base64(clm, rule_count: int) -> List[str]:
    encoded_images = []

    for i in range(1, rule_count+1):
        plt.close('all')  # Zavře předchozí figury a uvolní paměť

        clm.draw_rule(i, show=False)  # Vykreslí do aktuálního plt figure

        fig = plt.gcf()  # Získá aktuální figure (kde je nakresleno)

        buf = io.BytesIO()
        fig.savefig(buf, format='png', bbox_inches='tight')  # Ořízne bílé okraje
        buf.seek(0)

        encoded = base64.b64encode(buf.read()).decode('utf-8')
        encoded_images.append(encoded)

        plt.close(fig)  # Zavře použitou figuru

    return encoded_images


UNIQUENESS_THRESHOLD = 0.2  # adjust as needed

def is_above_uniqueness_threshold(cat_count: int, records_count: int) -> bool:
    return cat_count > UNIQUENESS_THRESHOLD * records_count
