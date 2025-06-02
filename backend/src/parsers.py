from typing import List

from src.classes import QuantifierValue, CFQuantifier

key_map = {
    "base": CFQuantifier.Base,
    "rel_base": CFQuantifier.RelBase,
    "s_up": CFQuantifier.S_Up,
    "s_down": CFQuantifier.S_Down,
    "s_any_up": CFQuantifier.S_Any_Up,
    "s_any_down": CFQuantifier.S_Any_Down,
    "max": CFQuantifier.Max,
    "min": CFQuantifier.Min,
    "rel_max": CFQuantifier.RelMax,
    "rel_min": CFQuantifier.RelMin,
    "rel_max_leq": CFQuantifier.RelMax_leq,
    "rel_min_leq": CFQuantifier.RelMin_leq,
}
def parse_clm_quantifiers(data: dict) -> List[QuantifierValue]:
    result = []
    for k, v in data.items():
        if k in key_map:
            result.append(QuantifierValue(quantifier=key_map[k], value=v))
    return result