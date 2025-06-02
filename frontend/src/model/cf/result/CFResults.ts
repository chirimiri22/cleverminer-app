import { Category } from "../../dataset/Category";
import { CFQuantifier } from "../../../constants/enums/CFQuantifier";
import { QuantifierValue } from "../condition/QuantifierValue";

export type CFResults = {
  rules: CFRule[];
  targetAttribute: string;
  conjunction: boolean;
  logs:ClmLogs
};

type ClmLogs = {
  summary: string;
  rulelist: string;
}

export type CFRule = {
  attributes: ResultAttribute[];
  histogramData: Category[];
  quantifiers: QuantifierValue[];
};
export type ResultAttribute = {
  title: string;
  selectedCategories: string[];
};

export const mockResults: CFResults = {
  rules: [
    {
      attributes: [
        { title: "Income", selectedCategories: ["Rich", "Middle Class"] },
        { title: "Age", selectedCategories: ["10-18", "18-25"] },
        { title: "Temp", selectedCategories: ["10-18", "18-25", "50", "247"] },
      ],
      histogramData: [
        { label: "New York", count: 150 },
        { label: "Los Angeles", count: 100 },
        { label: "Chicago", count: 200 },
        { label: "Houston", count: 50 },
        { label: "Phoenix", count: 80 },
        { label: "Philadelphia", count: 60 },
        { label: "San Antonio", count: 40 },
        { label: "San Diego", count: 30 },
        { label: "Dallas", count: 20 },
        { label: "San Jose", count: 10 },
      ],
      quantifiers: [],
      // quantifiers: {
      //   [CFQuantifier.Base]: 100,
      //   [CFQuantifier.RelBase]: 0.8,
      //   [CFQuantifier.RelMax]: 0.7,
      //   [CFQuantifier.RelMin_leq]: 0.9,
      // },
    },
    {
      attributes: [{ title: "Income", selectedCategories: ["Rich", "Middle Class"] }],
      histogramData: [
        { label: "New York", count: 150 },
        { label: "Los Angeles", count: 100 },
        { label: "Chicago", count: 200 },
        { label: "Houston", count: 50 },
        { label: "Phoenix", count: 80 },
        { label: "Philadelphia", count: 60 },
        { label: "San Antonio", count: 40 },
        { label: "San Diego", count: 30 },
        { label: "Dallas", count: 20 },
        { label: "San Jose", count: 10 },
      ],
      quantifiers: [],
      //   quantifiers: {
      //     [CFQuantifier.Base]: 100,
      //     [CFQuantifier.RelBase]: 0.8,
      //     [CFQuantifier.RelMax]: 0.7,
      //     [CFQuantifier.RelMin_leq]: 0.9,
      //   },
    },
    {
      attributes: [
        { title: "Income", selectedCategories: ["Rich"] },
        { title: "Age", selectedCategories: ["10-18"] },
      ],
      histogramData: [
        { label: "New York", count: 150 },
        { label: "Los Angeles", count: 100 },
        { label: "Chicago", count: 200 },
        { label: "Houston", count: 50 },
        { label: "Phoenix", count: 80 },
        { label: "Philadelphia", count: 60 },
        { label: "San Antonio", count: 40 },
        { label: "San Diego", count: 30 },
        { label: "Dallas", count: 20 },
        { label: "San Jose", count: 10 },
      ],
      quantifiers: [],
      // quantifiers: {
      //   [CFQuantifier.Base]: 100,
      //   [CFQuantifier.RelBase]: 0.8,
      //   [CFQuantifier.RelMax]: 0.7,
      //   [CFQuantifier.RelMin_leq]: 0.9,
      // },
    },
  ],
  targetAttribute: "City",
  conjunction: true,
  logs: {
    summary: "",
    rulelist: "",
  },
};
