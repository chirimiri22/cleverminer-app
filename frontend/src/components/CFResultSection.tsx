import { ArrowCircleRight, Settings, Terminal } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { mockDataset } from "../model/dataset/DatasetProcessed";
import { Colors } from "../styles/colors";
import { Histogram } from "./Histogram";
import { ResultRuleAttributes } from "./ResultRuleAttributes";
import { SectionBox } from "./SectionBox";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { useState } from "react";
import { BooleanInput } from "./Input/BooleanInput";
import { QuantifierChips } from "./QuantifierChips";
import { BootstrapTooltip } from "./BootstrapTooltip";
import { createSectionTitle, FOUR_STEPS } from "../pages/ProcedureCFMiner";
import { Subtitle } from "./Subtitle";
import { mockResults } from "../model/cf/result/CFResults";
import { useAppContext } from "../context/AppContext";

// const outputText = `
// Cleverminer version 1.2.1.
//         Starting data preparation ...
//         Automatically reordering numeric categories ...
//         Automatically reordering numeric categories ...done
//         Encoding columns into bit-form...
//         Encoding columns into bit-form...done
//         Data preparation finished.
//         Will go for  CFMiner
//         Starting to mine rules.
//         100%|####################################################|Elapsed Time: 0:00:00
//         Done. Total verifications : 8, rules 1, times: prep 0.01sec, processing 0.02sec
//
//         CleverMiner task processing summary:
//
//         Task type : CFMiner
//         Number of verifications : 8
//         Number of rules : 1
//         Total time needed : 00h 00m 00s
//         Time of data preparation : 00h 00m 00s
//         Time of rule mining : 00h 00m 00s
//
//         List of rules:
//         RULEID BASE  S_UP  S_DOWN Condition
//         1 10571     1     1 Speed_limit(40 50 60) & Vehicle_Type(Motorcycle over 500cc)
//         2  8803     1     1 Speed_limit(50 60) & Vehicle_Type(Motorcycle over 500cc)
//         3  1143     1     1 Speed_limit(50 60) & Vehicle_Type(Pedal cycle)
//         4 10690     1     1 Speed_limit(50 60 70) & Vehicle_Type(Motorcycle over 500cc)
//         5  1198     1     1 Speed_limit(50 60 70) & Vehicle_Type(Pedal cycle)
//         6  7694     1     1 Speed_limit(60) & Vehicle_Type(Motorcycle over 500cc)
//         7   996     1     1 Speed_limit(60) & Vehicle_Type(Pedal cycle)
//         8  9581     1     1 Speed_limit(60 70) & Vehicle_Type(Motorcycle over 500cc)
//         9  1051     1     1 Speed_limit(60 70) & Vehicle_Type(Pedal cycle)
// `;

export type CFQuantifierDisplay = {
  [K in keyof typeof CFQuantifier]: boolean;
};

//  todo: create comparator for 2 histograms - modalni okno
export const CFResultSection = () => {
  const form = useForm<CFQuantifierDisplay>();
  const { CFResults, datasetProcessed } = useAppContext();

  const formValues = form.watch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "boolean-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logOpen, setLogOpen] = useState(false);
  if (!CFResults || !datasetProcessed) return <></>;

  return (
    <SectionBox
      title={createSectionTitle(FOUR_STEPS.results)}
      rightUpperTools={
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <BootstrapTooltip title={"See logs from the process"} placement={"left"}>
            <IconButton size={"small"} sx={{ color: Colors.white }} onClick={() => setLogOpen(!logOpen)}>
              <Terminal fontSize={"small"} />
            </IconButton>
          </BootstrapTooltip>

          <IconButton size={"small"} sx={{ color: Colors.white }} onClick={handleClick}>
            <Settings fontSize={"small"} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={2} minWidth={200}>
              <Subtitle title={"Display Quantifiers"} />
              {Object.keys(CFQuantifier).map((key) => (
                <BooleanInput
                  key={key}
                  form={form}
                  name={key as keyof CFQuantifierDisplay}
                  label2={CFQuantifier[key as keyof typeof CFQuantifier]}
                />
              ))}
            </Box>
          </Popover>
        </Stack>
      }
      leftSection={
        !logOpen && (
          <Stack alignItems={"center"} justifyContent={"end"} flexGrow={1} gap={3} pb={5}>
            <Typography variant={"h5"}>{CFResults.targetAttribute}</Typography>
            {/*<Histogram categories={datasetProcessed[CF]} />*/}
          </Stack>
        )
      }
    >
      {logOpen && (
        <Stack bgcolor={Colors.black} height={"100%"} width={"100%"} flexGrow={1}>
          {/* todo: newline wrapping doesnt work*/}
          <Typography
            variant="body2"
            component="pre"
            sx={{
              color: Colors.white,
              p: 2,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              maxHeight: 350,
              overflowY: "auto",
            }}
          >
            {CFResults.logs.summary}
            {CFResults.logs.rulelist}
          </Typography>
        </Stack>
      )}

      <Stack direction={"row"} gap={2} display={logOpen ? "none" : "flex"}>
        {CFResults.rules.map((rule, ruleIndex) => (
          <Stack
            key={ruleIndex}
            alignItems={"center"}
            flexGrow={1}
            maxWidth={250}
            justifyContent={"space-between"}
            pr={ruleIndex === CFResults.rules.length - 1 ? 4 : 0}
          >
            <ResultRuleAttributes attributes={rule.attributes} conjunction={CFResults.conjunction} />

            <Stack alignItems={"center"}>
              {/* Arrow */}
              <ArrowCircleRight
                sx={{
                  py: 0.5,
                  height: 20,
                  width: 20,
                  transform: "rotate(90deg)",
                }}
                color={"success"}
              />
              <Card variant="outlined" sx={{ borderRadius: 2, borderColor: Colors.success, maxWidth: 250 }}>
                <CardContent>
                  <Histogram categories={rule.histogramData} color={Colors.textSecondary} datalabels />
                </CardContent>
              </Card>
              <QuantifierChips displayQuantifiers={formValues} rule={rule} ruleIndex={ruleIndex + 1} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SectionBox>
  );
};
