import { FilterAlt, QueryStats, Upload } from "@mui/icons-material";
import { Step } from "../model/Step";


export const PREPROCESS_STEPS: {
  load: Step;
  preview: Step;
  preprocess: Step;
} = {
  load: {
    name: "Load",
    icon: <Upload />,
    order: 1
  },
  preview: {
    name: "Preview",
    icon: <QueryStats />,
    order: 2
  },
  preprocess: {
    name: "Preprocess",
    icon: <FilterAlt />,
    order: 3
  },
};
