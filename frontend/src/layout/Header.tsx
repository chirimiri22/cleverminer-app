import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { APP_NAME } from "../constants/constants";
import { Logo } from "../components/Logo";
import { Colors } from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" elevation={0} color={"default"} sx={{ borderBottom: `1px solid ${Colors.border}` }}>
      {/* TODO: make mouse change*/}
      <Toolbar>
        <Stack sx={{ gap: 2, cursor: "pointer", }} onClick={() => navigate(ROUTES.HOME)} alignItems="center" direction="row">
          <Logo />
          <Typography variant="h5" component="div">
            {APP_NAME}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
