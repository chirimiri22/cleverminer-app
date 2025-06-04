import { Download } from "@mui/icons-material";
import { Box, Button, Paper, Typography, Stack, IconButton } from "@mui/material";

import { PageContainer } from "../layout/PageContainer";
import { PageHeading } from "../components/PageHeading";

import { ObserveAtrributeCard } from "../components/Card/ObserveAtrributeCard";
import { SectionBox } from "../components/SectionBox";

import { CFResultSection } from "../components/CFResultSection";
import { CFConditionSection } from "../components/CFConditionSection";
import { ReactNode } from "react";
import { PageNames } from "../constants/pageNames";
import { BootstrapTooltip } from "../components/BootstrapTooltip";
import { useAppContext } from "../context/AppContext";
import { ObserveDataSection } from "../components/ObserveDataSection";
import { useForm } from "react-hook-form";
import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { TypeOptions } from "../constants/enums/TypeOptions";
import { Step } from "../model/Step";
import { FOUR_STEPS } from "../constants/fourSteps";

export const createSectionTitle = (step: Step) => {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
      {step.icon}
      <Typography variant="h6">{step.name}</Typography>
    </Stack>
  );
};

export const ProcedureCFMiner = () => {
  const { getDatasetProcessed } = useAppContext();
  const datasetProcessed = getDatasetProcessed();
  const max = datasetProcessed ? datasetProcessed.data.length - 1 : 1;

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
          value: datasetProcessed ? Math.floor(datasetProcessed.metadata.rows * 0.5) : 5,
        },
      ],

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
    mode: "onBlur",
  });

  return (
    <PageContainer>
      <PageHeading title={PageNames.cfMiner.name} icon={PageNames.cfMiner.largeIcon} />

      <ObserveDataSection />
      {/* Condition Section */}
      <CFConditionSection form={form} />
      <CFResultSection conditionData={form.watch()} isFormValid={form.formState.isValid} />
      {/* Export */}

      <SectionBox title={createSectionTitle(FOUR_STEPS.exporting)}>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Button variant="outlined" startIcon={<Download />}>
            Export PNGs
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export CSV
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export TXT log
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            All in ZIP
          </Button>
        </Stack>
      </SectionBox>
    </PageContainer>
  );
};
