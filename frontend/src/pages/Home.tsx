import {
    Box, Button, Container, Divider, Grid, Paper,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Container sx={{flexGrow: 1, py: 4}}>
                <Typography variant="h3" align="center" gutterBottom sx={{color: '#333'}}>
                    Welcome to CleverMiner App!
                </Typography>
                <Grid container spacing={3} justifyContent="center" sx={{mt: 4}}>
                    <Grid>
                        <Button
                            variant="outlined"
                            startIcon={<span className="material-icons">folder</span>}
                            onClick={() => navigate('/datasets')}
                            sx={{borderRadius: 0, borderColor: '#999', color: '#333', px: 4, py: 2}}
                        >
                            Load data
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            variant="outlined"
                            startIcon={<span className="material-icons">settings</span>}
                            onClick={() => navigate('/cf-miner')}
                            sx={{borderRadius: 0, borderColor: '#999', color: '#333', px: 4, py: 2}}
                        >
                            CF Miner
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            variant="outlined"
                            startIcon={<span className="material-icons">swap_horiz</span>}
                            onClick={() => navigate('/4ft-miner')}
                            sx={{borderRadius: 0, borderColor: '#999', color: '#333', px: 4, py: 2}}
                        >
                            4FT Miner
                        </Button>
                    </Grid>
                </Grid>
                <Paper elevation={0} sx={{mt: 6, p: 3, border: '1px solid #ddd', borderRadius: 0}}>
                    <Typography variant="h6" gutterBottom>
                        CleverMiner walks you through 4 easy steps to discover patterns in your data!
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Box sx={{mr: 3}}>
                            <span className="material-icons" style={{fontSize: 40, color: '#666'}}>folder_open</span>
                        </Box>
                        <Typography variant="body1">
                            Observe the data structure
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Box sx={{mr: 3}}>
                            <span className="material-icons" style={{fontSize: 40, color: '#666'}}>edit</span>
                        </Box>
                        <Typography variant="body1">
                            Set the task to find interesting patterns
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Box sx={{mr: 3}}>
                            <span className="material-icons" style={{fontSize: 40, color: '#666'}}>visibility</span>
                        </Box>
                        <Typography variant="body1">
                            Examine results in a user-friendly format
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Box sx={{mr: 3}}>
                            <span className="material-icons" style={{fontSize: 40, color: '#666'}}>save_alt</span>
                        </Box>
                        <Typography variant="body1">
                            Export results in a machine-readable format
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <Divider/>
            <Box sx={{py: 2, textAlign: 'center', backgroundColor: '#f5f5f5'}}>
                <Typography variant="body2" color="textSecondary">
                    Running on Python CleverMiner package.{' '}
                    <a href="#" style={{color: '#666'}}>Read more</a>.
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{mt: 1}}>
                    2025
                </Typography>
            </Box>
        </Box>
    );
}
