import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ElementType } from "react";

const makeIcons = (IconComponent: ElementType) => ({
  icon: <IconComponent />,
  largeIcon: <IconComponent fontSize="large" />,
});


export const PageNames = {
  dataPreprocessing: {
    name: "Data & Preprocessing",
    ...makeIcons(StorageIcon),
  },
  cfMiner: {
    name: "CF Miner",
    ...makeIcons(BarChartIcon),
  },
  fourFtMiner: {
    name: "4ft Miner",
    ...makeIcons(SwapHorizIcon),
  },
  documentation: {
    name: "Documentation",
    ...makeIcons(HelpOutlineIcon),
  },
};
