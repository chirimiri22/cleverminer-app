import {BarChart, Download, PlayArrow} from "@mui/icons-material";
import {
    Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper,
    Select, Switch, TextField, Typography, Stack
} from "@mui/material";

import {PageContainer} from "../layout/PageContainer";
import {PageHeading} from "../components/PageHeading";

import {ObserveAtrributeCard} from "../components/Card/ObserveAtrributeCard";
import {AttributeData} from "../model/AttributeData";


const mockData: AttributeData[] = [
    {
        title: "City",
        categories: [
            {label: "New York", count: 150},
            {label: "Los Angeles", count: 100},
            {label: "Chicago", count: 200},
            {label: "Houston", count: 50},
            {label: "Phoenix", count: 80},
            {label: "Philadelphia", count: 60},
            {label: "San Antonio", count: 40},
            {label: "San Diego", count: 30},
            {label: "Dallas", count: 20},
            {label: "San Jose", count: 10},
            {label: "Austin", count: 50},
            {label: "Fort Worth", count: 30},
            {label: "Jacksonville", count: 20},
            {label: "Columbus", count: 78},
            {label: "Charlotte", count: 145},
            {label: "San Francisco", count: 10},
            {label: "Indianapolis", count: 15},
            {label: "Seattle", count: 100},
            {label: "Denver", count: 100},
            {label: "Washington", count: 10},
        ]
    },
    {
        title: "Age",
        categories: [
            {label: "10-18", count: 150},
            {label: "18-25", count: 100},
            {label: "26-35", count: 200},
            {label: "36-45", count: 50},
            {label: "46-55", count: 80},
            {label: "56-65", count: 60},
            {label: "65+", count: 40},

        ]
    },
    {
        title: "Income",
        categories: [
            {label: "<$20k", count: 150},
            {label: "$20k-$50k", count: 100},
            {label: "$50k-$100k", count: 200},
            {label: ">$100k", count: 50},
        ]
    },
    {
        title: "Gender",
        categories: [
            {label: "male", count: 100},
            {label: "female", count: 200},]
    }
]

export const ProcedureCFMiner = () => {
    return (
        <PageContainer>
            <PageHeading title={"CF Miner"} icon={<BarChart fontSize={"large"}/>}/>


            {/* Observe */}
            <Paper variant="outlined" sx={{p: 2, mb: 4,}}>
                <Typography variant="h6" fontWeight={"bold"}>🔍 Observe</Typography>
                <Stack direction={"row"} sx={{gap: 2, mt: 2, overflowX: "auto"}}>
                    {mockData.map((data, index) => (
                        <ObserveAtrributeCard key={index} attributeData={data}/>
                    ))}
                </Stack>
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

        </PageContainer>
    );
}
