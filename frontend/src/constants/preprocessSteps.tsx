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
  },
  preview: {
    name: "Preview",
    icon: <QueryStats />,
  },
  preprocess: {
    name: "Preprocess",
    icon: <FilterAlt />,
  },
};
