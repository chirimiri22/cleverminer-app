import {AppBar, Toolbar, Typography} from "@mui/material";
import {APP_NAME} from "../constants/constants";

export const Header = () => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    {APP_NAME}
                </Typography>
            </Toolbar>
        </AppBar>
    );

}
