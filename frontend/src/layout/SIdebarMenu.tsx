import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {ROUTES} from "../constants/routes";
import {CLEVERMINER_DOCS_URL} from "../constants/constants";
import {MenuItem, MenuItemType} from "./MenuItem";


type GroupType = {
    items: MenuItemType[];
}

// Menu Data
const menuGroups: GroupType[] = [
    {
        items: [
            {name: 'Data & Preprocessing', icon: <StorageIcon/>, path: ROUTES.DATASETS},
        ],
    },
    {
        items: [
            {name: 'CFMiner', icon: <BarChartIcon/>, path: ROUTES.CF_MINER},
            {name: '4ftMiner', icon: <SwapHorizIcon/>, path: ROUTES["4FT_MINER"]},
        ],
    },
    {
        items: [
            {name: 'Documentation', icon: <HelpOutlineIcon/>, path: CLEVERMINER_DOCS_URL},
        ],
    },
];

// Sidebar Menu Component
export const SidebarMenu = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (

        <Stack sx={{minWidth: 300, borderRight: '1px solid #ddd', bgcolor: '#f5f5f5'}}>
            {menuGroups.map((group, index) => (
                <>
                    <List key={index}>
                        {group.items.map((item, idx) => (
                            <MenuItem
                                key={idx}
                                name={item.name}
                                icon={item.icon}
                                path={item.path}
                                selected={currentPath === item.path}
                            />
                        ))}
                    </List>
                    {index < menuGroups.length - 1 && <Divider/>}
                </>
            ))}
        </Stack>

    );
};


