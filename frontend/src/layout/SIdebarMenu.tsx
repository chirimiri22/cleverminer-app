import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { CLEVERMINER_DOCS_URL } from "../constants/constants";
import { SidebarMenuItem, MenuItemType } from "./SidebarMenuItem";
import { Colors } from "../styles/colors";
import { PageNames } from "../constants/pageNames";

type GroupType = {
  items: MenuItemType[];
};

// Menu Data
export const menuGroups: GroupType[] = [
  {
    items: [
      {
        name: PageNames.dataPreprocessing.name,
        icon: PageNames.dataPreprocessing.icon,
        path: ROUTES.DATASET,
      },
    ],
  },
  {
    items: [
      {
        name: PageNames.cfMiner.name,
        icon: PageNames.cfMiner.icon,
        path: ROUTES.CF_MINER,
      },
      {
        name: PageNames.fourFtMiner.name,
        icon: PageNames.fourFtMiner.icon,
        path: ROUTES["4FT_MINER"],
      },
    ],
  },
  {
    items: [
      {
        name: PageNames.documentation.name,
        icon: PageNames.documentation.icon,
        path: CLEVERMINER_DOCS_URL,
      },
    ],
  },
];

// Sidebar Menu Component
export const SidebarMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Stack sx={{ minWidth: 300, borderRight: `1px solid ${Colors.border}`, bgcolor: Colors.sidebar }}>
      {menuGroups.map((group, index) => (
        <Stack direction={"row"} key={index}>
          <List sx={{ flexGrow: 1 }}>
            {group.items.map((item, idx) => (
              <SidebarMenuItem
                key={idx}
                name={item.name}
                icon={item.icon}
                path={item.path}
                selected={currentPath === item.path}
              />
            ))}
          </List>
          {index < menuGroups.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  );
};
