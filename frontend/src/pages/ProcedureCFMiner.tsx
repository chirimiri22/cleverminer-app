import {BarChart, Download, PlayArrow} from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField,
    Typography,
    Stack,
    ToggleButton,
    Slider,
    SelectChangeEvent,
} from "@mui/material";

import {PageContainer} from "../layout/PageContainer";
import {PageHeading} from "../components/PageHeading";

import {ObserveAtrributeCard} from "../components/Card/ObserveAtrributeCard";
import {SectionBox} from "../components/SectionBox";
import {mockDataset} from "../model/Dataset";
import {Colors} from "../styles/colors";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {NumberInput} from "../components/Input/NumberInput";
import {SelectInput} from "../components/Input/SelectInput";
import {RangeSliderInput} from "../components/Input/RangeSliderInput";
import {IntervalRange} from "../model/IntervalRange";
import {BooleanInput} from "../components/Input/BooleanInput";
import {CFQuantifier} from "../constants/enums/CFQuantifier";
import {CFQuantifiersSection} from "../components/CFQuantifiersSection";
import {CFProcedure} from "../model/CFProcedure";

type QuantifierValues = {
    [key in CFQuantifier]: number | undefined;
};

type QuantifierProps = {
    onChange: (quantifier: CFQuantifier, value?: number) => void;
    quantifier?: CFQuantifier;
};

type QuantifierState = {
    quantifier?: CFQuantifier;
    value?: number;
};
const QuantifierRow = ({onChange, quantifier}: QuantifierProps) => {
    const form = useForm<QuantifierState>({
        defaultValues: {
            quantifier: undefined,
            value: undefined,
        },
    });

    const state = form.watch();

    const handleBlur = () => {
        if (state.quantifier) {
            onChange(state.quantifier, state.value ? state.value : undefined);
        }
    };

    return (
        <Stack direction="row" sx={{gap: 2}}>
            <SelectInput
                label={"Quantifier"}
                form={form}
                name={"quantifier"}
                onBlur={handleBlur}
                options={Object.values(CFQuantifier).map((q, i) => ({label: q, value: q}))}
            />

            <NumberInput label={"Value"} form={form} name={"value"} onBlur={handleBlur} min={0}/>
        </Stack>
    );
};

export const ConditionSettings = () => {
    const [data, setData] = useState<QuantifierValues>({
        Base: undefined,
        Max: undefined,
        Min: undefined,
        RelBase: undefined,
        RelMax: undefined,
        RelMax_leq: undefined,
        RelMin: undefined,
        RelMin_leq: undefined,
        S_Any_Down: undefined,
        S_Any_Up: undefined,
        S_Down: undefined,
        S_Up: undefined,
    });

    const form = useForm<CFProcedure>({
        defaultValues: {
            quantifiers: [{quantifier: CFQuantifier.Base, value: undefined}],
        }
    });



    return (
        <Stack gap={2}>
            <Stack gap={1}>
                <Typography variant="subtitle1" fontWeight={"bold"}>
                    Settings
                </Typography>
                <BooleanInput form={form} name={"conjunction"} label1={"OR"} label2={"AND"}/>
                <RangeSliderInput max={5} form={form} name={"range"}/>
            </Stack>

            <Stack gap={1}>
                <Typography variant="subtitle1" fontWeight={"bold"}>
                    Quantifiers
                </Typography>
                <CFQuantifiersSection form={form}/>

            </Stack>
        </Stack>
    );
};

export const ProcedureCFMiner = () => {
    return (
        <PageContainer>
            <PageHeading title={"CF Miner"} icon={<BarChart fontSize={"large"}/>}/>

            {/* todo: use mui icons*/}
            <SectionBox title={"🔍 Observe"}>
                <Stack direction={"row"} sx={{gap: 2, overflowX: "auto"}}>
                    {mockDataset.data.map((data, index) => (
                        <ObserveAtrributeCard key={index} attributeData={data}/>
                    ))}
                </Stack>
            </SectionBox>

            {/* Condition Section */}
            <SectionBox title={"🛠️ Condition"} leftSection={<ConditionSettings/>} minHeight={300}>
                CARDS
            </SectionBox>

            {/* Results */}
            <Paper variant="outlined" sx={{p: 2, mb: 4}}>
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    <Typography variant="h6">📊 Results</Typography>
                    <Button variant="contained" startIcon={<PlayArrow/>}>
                        Run
                    </Button>
                </Box>

                {/* Rule count and charts */}
                <Typography sx={{mt: 2}}>Rule count: 2</Typography>
                <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid>
                        {/* todo: item*/}
                        <Paper variant="outlined" sx={{p: 2}}>
                            <Typography variant="subtitle2">Income</Typography>
                            <Box sx={{height: 100, backgroundColor: "#eee"}}>Chart</Box>
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper variant="outlined" sx={{p: 2}}>
                            <Typography variant="subtitle2">City</Typography>
                            <Box sx={{height: 100, backgroundColor: "#eee"}}>Chart</Box>
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper variant="outlined" sx={{p: 2}}>
                            <Typography variant="subtitle2">Age</Typography>
                            <Box sx={{height: 100, backgroundColor: "#eee"}}>Chart</Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            {/* Export */}
            <Paper variant="outlined" sx={{p: 2}}>
                <Typography variant="h6">📤 Export</Typography>
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, mt: 2}}>
                    <Button variant="outlined" startIcon={<Download/>}>
                        Export PNGs
                    </Button>
                    <Button variant="outlined" startIcon={<Download/>}>
                        Export CSV
                    </Button>
                    <Button variant="outlined" startIcon={<Download/>}>
                        Export TXT log
                    </Button>
                    <Button variant="outlined" startIcon={<Download/>}>
                        All in ZIP
                    </Button>
                </Box>
            </Paper>
        </PageContainer>
    );
};
