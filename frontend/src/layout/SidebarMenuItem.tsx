import { ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { isUrl } from "../helpers/isUrl";
import { browserNavigate } from "../helpers/browserNavigate";

type Props = MenuItemType & { selected: boolean; note?: ReactNode };

// Reusable Menu Item Component
export const SidebarMenuItem = ({ name, icon, path, selected, note }: Props) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => (isUrl(path) ? browserNavigate(path) : navigate(path))} selected={selected}>
        <Stack alignItems={"start"}>
          <Stack direction={"row"} alignItems={"center"}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </Stack>
          <Stack ml={7}>{note}</Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

// TODO: use model folder
export type MenuItemType = {
  name: string;
  icon: ReactNode;
  path: string;
};
