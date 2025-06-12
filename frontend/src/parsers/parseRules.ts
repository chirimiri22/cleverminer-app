import { CFRule, ResultAttribute } from "../model/cf/results/CFResults";
import { Category } from "../model/dataset/Category";
import { parseQuantifiers } from "./parseQuantifires";

// export const parseRules = (data: any): CFRule[] => {
//   return data["rules"].map((rule: any) => parseRule(rule));
// };
//
// const parseRule = (rule: any): CFRule => {
//   const attributes: ResultAttribute[] = rule["attributes"].map((attribute: any) => ({
//     title: attribute["title"],
//     selectedCategories: attribute["selectedCategories"],
//   }));
//   const histogramData: Category[] = rule.histogramData.map((category: any) => ({
//     label: category["label"],
//     count: category["count"],
//   }));
//   const quantifiers = parseQuantifiers(rule["quantifiers"]);
//
//   return {
//     attributes,
//     histogramData: histogramData,
//     // quantifiers: quantifiers,
//   };
// };
