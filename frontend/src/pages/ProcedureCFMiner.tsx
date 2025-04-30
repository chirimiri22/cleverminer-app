import {Download, PlayArrow} from "@mui/icons-material";
import {
    Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper,
    Select, Switch, TextField, Typography
} from "@mui/material";
import {AttributeCard} from "../components/AttributeCard";

export const ProcedureCFMiner = () => {
    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Typography variant="h4" gutterBottom>📊 CF-Miner</Typography>

            {/* Observe */}
            <Paper variant="outlined" sx={{p: 2, mb: 4}}>
                <Typography variant="h6">🔍 Observe</Typography>
                <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                    <AttributeCard
                        title="City"
                        count={5}
                        items={["Brno 155", "Prague 201", "Ostrava 123", "Kolin 2"]}
                        showList={true}
                    />
                    <AttributeCard
                        title="Age"
                        count={4}
                        items={[]}
                        showList={false}
                    />
                </Box>
            </Paper>

            {/* Condition Section */}
            <Paper variant="outlined" sx={{p: 2, mb: 4}}>
                <Typography variant="h6">🛠️ Condition</Typography>
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center', mt: 2}}>
                    <Box>
                        <Typography variant="body2">Settings</Typography>
                        <Switch defaultChecked/>
                        <Typography variant="body2">Quantifiers</Typography>
                        <TextField label="Q1" size="small" sx={{my: 0.5}}/>
                        <TextField label="Q2" size="small"/>
                    </Box>

                    <FormControl size="small">
                        <InputLabel>Attribute</InputLabel>
                        <Select label="Attribute" value="City">
                            <MenuItem value="City">City</MenuItem>
                            <MenuItem value="Age">Age</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField label="Min" size="small" type="number"/>
                    <TextField label="Max" size="small" type="number"/>

                    <Typography>AND</Typography>

                    <FormControl size="small">
                        <InputLabel>Attribute</InputLabel>
                        <Select label="Attribute" value="Age">
                            <MenuItem value="City">City</MenuItem>
                            <MenuItem value="Age">Age</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField label="Min" size="small" type="number"/>
                    <TextField label="Max" size="small" type="number"/>

                    <Typography>=&gt;</Typography>
                    <TextField label="Target: Income" size="small"/>
                </Box>
            </Paper>

            {/* Results */}
            <Paper variant="outlined" sx={{p: 2, mb: 4}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Typography variant="h6">📊 Results</Typography>
                    <Button variant="contained" startIcon={<PlayArrow/>}>Run</Button>
                </Box>

                {/* Rule count and charts */}
                <Typography sx={{mt: 2}}>Rule count: 2</Typography>
                <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid>
                        {/* todo: item*/}
                        <Paper variant="outlined" sx={{p: 2}}>
                            <Typography variant="subtitle2">Income</Typography>
                            <Box sx={{height: 100, backgroundColor: '#eee'}}>Chart</Box>
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper variant="outlined" sx={{p: 2}}>
                            <Typography variant="subtitle2">City</Typography>
                            <Box sx={{height: 100, backgroundColor: '#eee'}}>Chart</Box>
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper variant="outlined" sx={{p: 2}}>
                            <Typography variant="subtitle2">Age</Typography>
                            <Box sx={{height: 100, backgroundColor: '#eee'}}>Chart</Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            {/* Export */}
            <Paper variant="outlined" sx={{p: 2}}>
                <Typography variant="h6">📤 Export</Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2}}>
                    <Button variant="outlined" startIcon={<Download/>}>Export PNGs</Button>
                    <Button variant="outlined" startIcon={<Download/>}>Export CSV</Button>
                    <Button variant="outlined" startIcon={<Download/>}>Export TXT log</Button>
                    <Button variant="outlined" startIcon={<Download/>}>All in ZIP</Button>
                </Box>
            </Paper>
        </Container>
    );
}
