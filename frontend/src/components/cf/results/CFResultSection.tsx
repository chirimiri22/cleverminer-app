import {
  ArrowCircleRight,
  Delete,
  PlayCircle,
  ReplayCircleFilled,
  Settings,
  StopCircle,
  Terminal,
} from "@mui/icons-material";
import { Box, Card, CardContent, Chip, IconButton, LinearProgress, Popover, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { mockDataset } from "../../../model/dataset/DatasetProcessed";
import { Colors } from "../../../styles/colors";
import { Histogram } from "../../common/charts/Histogram";
import { ResultRuleAttributes } from "./ResultRuleAttributes";
import { SectionBox } from "../../common/SectionBox";
import { CFQuantifier } from "../../../constants/enums/CFQuantifier";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { BooleanInput } from "../../common/input/BooleanInput";
import { QuantifierChips } from "./QuantifierChips";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";
import { createSectionTitle } from "../../../helpers/createSectionTitle";
import { Subtitle } from "../../common/Subtitle";
import { useAppContext } from "../../../context/AppContext";
import { startCFProcedure } from "../../../apiCalls/startCFProcedure";
import { CFProcedure } from "../../../model/cf/condition/CFProcedure";
import { LoadDatasetFirst } from "../../common/LoadDatasetFirst";
import { FOUR_STEPS } from "../../../constants/fourSteps";
import { apiCallWrapper } from "../../../apiCalls/apiCallWrapper";

type Props = {
  conditionData: CFProcedure;
  isFormValid: boolean;
};

export type CFQuantifierDisplay = {
  [K in keyof typeof CFQuantifier]: boolean;
};

//  todo: create comparator for 2 histograms - modalni okno
export const CFResultSection = forwardRef<HTMLDivElement, Props>(({ conditionData, isFormValid }, ref) => {
  const form = useForm<CFQuantifierDisplay>({
    defaultValues: {
      [CFQuantifier.Base]: true,
    },
  });
  const { CFResults, getDatasetProcessed, datafile, setCFResults } = useAppContext();

  const datasetProcessed = getDatasetProcessed();
  const formValues = form.watch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const handleStartProcedure = async () => {
    setCFResults(undefined);
    setError(undefined);
    if (conditionData && datafile) {
      setLoading(true);
      const result = await apiCallWrapper(() => startCFProcedure(conditionData, datafile), setError);
      setLoading(false);

      setCFResults(result);
    }
  };
  const chipsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  const f = JSON.stringify(form.watch());

  useEffect(() => {
    if (chipsRef.current) {
      setHeight(chipsRef.current.offsetHeight);
    }
  }, [chipsRef.current?.offsetHeight, f]);

  const disabled = !conditionData.condition.targetAttribute;
  const open = Boolean(anchorEl);
  const id = open ? "boolean-popover" : undefined;
 const max = CFResults?.targetAttributeHistogram.categories.reduce((max, current) => Math.max(max, current.count), 0);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logOpen, setLogOpen] = useState(false);

  return (
    <SectionBox
      title={
        <Stack direction={"row"} gap={1} alignItems={"end"}>
          {createSectionTitle(FOUR_STEPS.results)}
          {!!CFResults && (
            <IconButton onClick={handleStartProcedure} size={"small"} disabled={disabled}>
              <ReplayCircleFilled color={"primary"} />
            </IconButton>
          )}
        </Stack>
      }
      error={error}
      loading={loading}
      rightUpperTools={
        CFResults && (
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
                    value={false}
                    form={form}
                    name={key as keyof CFQuantifierDisplay}
                    label2={CFQuantifier[key as keyof typeof CFQuantifier]}
                  />
                ))}
              </Box>
            </Popover>
            <BootstrapTooltip title={"Remove results"} placement={"left"}>
              <IconButton size={"small"} sx={{ color: Colors.white }} onClick={() => setCFResults(undefined)}>
                <Delete fontSize={"small"} />
              </IconButton>
            </BootstrapTooltip>
          </Stack>
        )
      }
      leftSection={
        !logOpen &&
        CFResults && (
          <Stack alignItems={"center"} justifyContent={"space-between"} flexGrow={1} gap={3} mb={2} pb={`${height}px`}>
            <Subtitle title={`Rules found: ${CFResults.rules.length}`} />
            <Stack maxWidth={"100%"} gap={2} alignItems={"center"}>
              <Typography variant={"h5"}>{CFResults.targetAttributeHistogram.title}</Typography>

              <Histogram categories={CFResults.targetAttributeHistogram.categories} max={max} datalabels />

              <Chip
                label={`Entire dataset distribution`}
                sx={{ height: "43px", fontColor: Colors.black }}
                variant={"outlined"}
                size="small"
                color={"primary"}
              />
            </Stack>
          </Stack>
        )
      }
    >
      {(() => {
        if (!datasetProcessed) {
          return <Box />;
        }

        if (!CFResults) {
          return (
            <Stack alignItems="center" flexGrow={1} justifyContent="center">
              <Subtitle title="Start the procedure" />
              {!loading ? (
                <IconButton onClick={handleStartProcedure} size="large" disabled={!isFormValid}>
                  <PlayCircle
                    sx={{
                      height: 50,
                      width: 50,
                      color: isFormValid ? Colors.primary : Colors.textSecondary,
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton size="large">
                  {/*todo: make it work*/}
                  <StopCircle
                    sx={{
                      height: 50,
                      width: 50,
                      color: Colors.error,
                    }}
                  />
                </IconButton>
              )}
            </Stack>
          );
        }

        return (
          <>
            {logOpen && (
              <Stack bgcolor={Colors.black} height={"100%"} flexGrow={1}>
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

            <Stack ref={ref} direction={"row"} gap={1} display={logOpen ? "none" : "flex"}>
              {CFResults.rules.map((rule, ruleIndex) => (
                <Stack
                  key={ruleIndex}
                  alignItems={"center"}
                  flexGrow={1}
                  p={1}
                  bgcolor={Colors.white}
                  maxWidth={250}
                  justifyContent={"space-between"}
                  pr={ruleIndex === CFResults.rules.length - 1 ? 4 : 1}
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
                    <Card variant="outlined" sx={{ borderRadius: 2, borderColor: Colors.success, maxWidth: 240 }}>
                      <CardContent>
                        <Histogram categories={rule.histogramData} color={Colors.textSecondary} datalabels max={max} />
                      </CardContent>
                    </Card>
                    <QuantifierChips
                      ref={ruleIndex === 0 ? chipsRef : undefined}
                      displayQuantifiers={formValues}
                      rule={rule}
                      ruleIndex={ruleIndex + 1}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </>
        );
      })()}
    </SectionBox>
  );
});
