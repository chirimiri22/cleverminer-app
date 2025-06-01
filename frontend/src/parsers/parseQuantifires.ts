import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { QuantifierValue } from "../model/cf/condition/QuantifierValue";

export function parseQuantifiers(object: Object): QuantifierValue[] {
  return Object.entries(object).map(([key, value]): QuantifierValue | undefined => {
    switch (key) {
      case "base":
        return { quantifier: CFQuantifier.Base, value };
      case "rel_base":
        return { quantifier: CFQuantifier.RelBase, value };
      case "s_up":
        return { quantifier: CFQuantifier.S_Up, value };
      case "s_down":
        return { quantifier: CFQuantifier.S_Down, value };
      case "s_any_up":
        return { quantifier: CFQuantifier.S_Any_Up, value };
      case "s_any_down":
        return { quantifier: CFQuantifier.S_Any_Down, value };
      case "max":
        return { quantifier: CFQuantifier.Max, value };
      case "min":
        return { quantifier: CFQuantifier.Min, value };
      case "rel_max":
        return { quantifier: CFQuantifier.RelMax, value };
      case "rel_min":
        return { quantifier: CFQuantifier.RelMin, value };
      case "rel_max_leq":
        return { quantifier: CFQuantifier.RelMax_leq, value };
      case "rel_min_leq":
        return { quantifier: CFQuantifier.RelMin_leq, value };
      default:
        return undefined;
    }
  }).filter((q): q is QuantifierValue => q !== undefined);
}
