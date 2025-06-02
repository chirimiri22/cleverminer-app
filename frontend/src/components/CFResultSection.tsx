import { ArrowCircleRight, PlayCircle, Settings, Terminal } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, IconButton, LinearProgress, Popover, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { mockDataset } from "../model/dataset/DatasetProcessed";
import { Colors } from "../styles/colors";
import { Histogram } from "./Histogram";
import { ResultRuleAttributes } from "./ResultRuleAttributes";
import { SectionBox } from "./SectionBox";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import React, { useState } from "react";
import { BooleanInput } from "./Input/BooleanInput";
import { QuantifierChips } from "./QuantifierChips";
import { BootstrapTooltip } from "./BootstrapTooltip";
import { createSectionTitle, FOUR_STEPS } from "../pages/ProcedureCFMiner";
import { Subtitle } from "./Subtitle";
import { mockResults } from "../model/cf/result/CFResults";
import { useAppContext } from "../context/AppContext";
import { startCFProcedure } from "../apiCalls/startCFProcedure";
import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { LoadDatasetFirst } from "./LoadDatasetFirst";

type Props = {
  conditionData: CFProcedure;
  isFormValid: boolean;
};

export type CFQuantifierDisplay = {
  [K in keyof typeof CFQuantifier]: boolean;
};

//  todo: create comparator for 2 histograms - modalni okno
export const CFResultSection = ({ conditionData, isFormValid }: Props) => {
  const form = useForm<CFQuantifierDisplay>();
  const { CFResults, datasetProcessed, datafile, setCFResults } = useAppContext();

  const formValues = form.watch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [loading, setLoading] = useState(false);
  const handleStartProcedure = async () => {
    if (conditionData && datafile) {
      setLoading(true);
      const result = await startCFProcedure(conditionData, datafile);
      setCFResults(result);
      setLoading(false);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "boolean-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logOpen, setLogOpen] = useState(false);

  if (!datasetProcessed)
    return (
      <SectionBox title={createSectionTitle(FOUR_STEPS.results)}>
        <LoadDatasetFirst />
      </SectionBox>
    );

  if (!CFResults) {
    return (
      <SectionBox title={createSectionTitle(FOUR_STEPS.results)}>
        <Stack alignItems={"center"} flexGrow={1} justifyContent={"center"}>
          <Subtitle title={"Start the procedure"} />
          <IconButton onClick={handleStartProcedure} size="large" disabled={!isFormValid}>
            {/* Arrow */}
            <PlayCircle
              sx={{
                height: 50,
                width: 50,
              }}
              color={"primary"}
            />
          </IconButton>
          {loading && <LinearProgress sx={{ position: "absolute", bottom: 0, right: 0, width: "100%" }} />}
        </Stack>
      </SectionBox>
    );
  }

  return (
    <SectionBox
      title={
        <Stack direction={"row"} gap={1} alignItems={"end"}>
          {createSectionTitle(FOUR_STEPS.results)}
          <IconButton onClick={handleStartProcedure} size={"small"}>
            <PlayCircle color={"primary"} />
          </IconButton>
        </Stack>
      }
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
          <Stack alignItems={"start"} flexGrow={1} gap={3} pb={5}>
            <Subtitle title={`Rules found: ${CFResults.rules.length}`} />
            <Stack maxWidth={"100%"}>
              <Typography variant={"h5"}>{CFResults.targetAttributeHistogram.title}</Typography>
              <Histogram categories={CFResults.targetAttributeHistogram.categories} />
            </Stack>
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
