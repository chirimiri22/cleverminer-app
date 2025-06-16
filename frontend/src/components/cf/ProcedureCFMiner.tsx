import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  IconButton,
  StepLabel,
  Stepper,
  Step as StepMUI,
  StepContent,
  styled,
} from "@mui/material";

import { PageContainer } from "../app-layout/PageContainer";
import { PageHeading } from "../common/PageHeading";

import { ObserveAtrributeCard } from "./observe/ObserveAtrributeCard";
import { SectionBox } from "../common/SectionBox";

import { CFResultSection } from "./results/CFResultSection";
import { CFConditionSection } from "./condition/CFConditionSection";
import React, { ReactNode, useRef, useState } from "react";
import { PageNames } from "../../constants/pageNames";
import { BootstrapTooltip } from "../common/BootstrapTooltip";
import { useAppContext } from "../../context/AppContext";
import { ObserveDataSection } from "./observe/ObserveDataSection";
import { useForm } from "react-hook-form";
import { CFProcedure } from "../../model/cf/condition/CFProcedure";
import { CFQuantifier } from "../../constants/enums/CFQuantifier";
import { TypeOptions } from "../../constants/enums/TypeOptions";
import { Step } from "../../model/Step";
import { FOUR_STEPS } from "../../constants/fourSteps";
import { CFExportSection } from "./export/CFExportSection";
import { downloadChildrenAsPNGsZip } from "../../helpers/donwload";
import { Colors } from "../../styles/colors";
import { createSectionTitle } from "../../helpers/createSectionTitle";

const AlwaysVisibleStepMUIContent = styled(StepContent)({
  display: "block",
  marginLeft: 16,
});

export const ProcedureCFMiner = () => {
  const { getDatasetProcessed, CFResults } = useAppContext();
  const datasetProcessed = getDatasetProcessed();
  const max = datasetProcessed ? datasetProcessed.data.length - 1 : 1;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<CFProcedure>({
    defaultValues: {
      range: {
        start: 0,
        end: max,
      },
      conjunction: true,
      quantifiers: [
        {
          quantifier: CFQuantifier.Base,
          value: datasetProcessed ? Math.floor(datasetProcessed.metadata.rows * 0.8) : 5,
        },
      ],
      generateImages: false,
      condition: {
        conditionAttributes: [
          {
            attribute: datasetProcessed?.data[0].title,
            type: TypeOptions.Subset,
            range: {
              start: 0,
              end: datasetProcessed?.data[0].categories.length,
            },
          },
        ],
      },
    },
    mode: "onChange",
  });

  return (
    <PageContainer>
      <PageHeading title={PageNames.cfMiner.name} icon={PageNames.cfMiner.largeIcon} />

      <Stepper orientation="vertical" nonLinear>
        <StepMUI expanded active={true}>
          <StepLabel>
            <Typography variant="h6" fontWeight={"bold"} mb={1} ml={1}>
              {createSectionTitle(FOUR_STEPS.observe)}
            </Typography>
          </StepLabel>
          <StepContent>
            <ObserveDataSection />
          </StepContent>
        </StepMUI>

        <StepMUI expanded active={!!datasetProcessed}>
          <StepLabel>
            <Typography variant="h6" fontWeight={"bold"} mb={1} ml={1}>
              {createSectionTitle(FOUR_STEPS.condition)}
            </Typography>
          </StepLabel>
          <StepContent>
            <CFConditionSection form={form} />
          </StepContent>
        </StepMUI>

        <StepMUI expanded active={!!datasetProcessed && form.formState.isValid}>
          <StepLabel>
            <Typography variant="h6" fontWeight={"bold"} mb={1} ml={1}>
              {createSectionTitle(FOUR_STEPS.results)}
            </Typography>
          </StepLabel>
          <StepContent>
            <CFResultSection conditionData={form.watch()} isFormValid={form.formState.isValid} ref={containerRef} />
          </StepContent>
        </StepMUI>

        <StepMUI expanded active={!!CFResults}>
          <StepLabel>
            <Typography variant="h6" fontWeight={"bold"} mb={1} ml={1}>
              {createSectionTitle(FOUR_STEPS.exporting)}
            </Typography>
          </StepLabel>
          <StepContent>
            <CFExportSection
              downloadRenderedAsPNG={() => downloadChildrenAsPNGsZip(containerRef.current, null, "rules.zip")}
            />
          </StepContent>
        </StepMUI>
      </Stepper>
    </PageContainer>
  );
};
