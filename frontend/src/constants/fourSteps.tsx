import { AutoGraph, Construction, Download, QueryStats } from "@mui/icons-material";
import { Step } from "../model/Step";

export const FOUR_STEPS: {
  observe: Step;
  condition: Step;
  results: Step;
  exporting: Step;
} = {
  observe: {
    name: "Observe",
    icon: <QueryStats />,
    order: 1
  },
  condition: {
    name: "Condition",
    icon: <Construction />,
    order: 2
  },
  results: {
    name: "Results",
    icon: <AutoGraph />,
    order: 3
  },
  exporting: {
    name: "Export",
    icon: <Download />,
    order: 4
  },
};
