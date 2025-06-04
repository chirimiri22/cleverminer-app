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
  },
  condition: {
    name: "Condition",
    icon: <Construction />,
  },
  results: {
    name: "Results",
    icon: <AutoGraph />,
  },
  exporting: {
    name: "Export",
    icon: <Download />,
  },
};
