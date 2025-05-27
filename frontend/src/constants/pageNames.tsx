import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const PageNames = {
  dataPreprocessing: {
    name: "Data & Preprocessing",
    icon: <StorageIcon />,
    largeIcon: <StorageIcon fontSize="large" />,
  },
  cfMiner: {
    name: "CF Miner",
    icon: <BarChartIcon />,
    largeIcon: <BarChartIcon fontSize="large" />,
  },
  fourFtMiner: {
    name: "4ft Miner",
    icon: <SwapHorizIcon />,
    largeIcon: <SwapHorizIcon fontSize="large" />,
  },
  documentation: {
    name: "Documentation",
    icon: <HelpOutlineIcon />,
    largeIcon: <HelpOutlineIcon fontSize="large" />,
  },
};
