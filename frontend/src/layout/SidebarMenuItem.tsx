import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { isUrl } from "../helpers/isUrl";
import { browserNavigate } from "../helpers/browserNavigate";

type Props = MenuItemType & { selected: boolean };



// Reusable Menu Item Component
export const SidebarMenuItem = ({ name, icon, path, selected }: Props) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => (isUrl(path) ? browserNavigate(path) : navigate(path))} selected={selected}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
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
