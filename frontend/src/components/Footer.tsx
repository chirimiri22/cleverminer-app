import {Box, Link, Typography} from "@mui/material";
import {CLEVERMINER_DOCS_URL} from "../constants/constants";

export const Footer = () => {
    return <Box sx={{py: 2, textAlign: 'center', backgroundColor: '#f5f5f5'}}>
        <Typography variant="body2" color="textSecondary">
            Running on Python CleverMiner package.{' '}
            <Link href={CLEVERMINER_DOCS_URL}>Read more</Link>.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{mt: 1}}>
            2025
        </Typography>
    </Box>


}
