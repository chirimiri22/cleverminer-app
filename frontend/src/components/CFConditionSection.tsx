import { CFConditionSettings } from "./CFConditionSettings";

import { ConditionBuilder } from "./CFConditionBuilder";
import { SectionBox } from "./SectionBox";
import { useState } from "react";
import { BootstrapTooltip } from "./BootstrapTooltip";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowCircleRight, PlayArrow } from "@mui/icons-material";
import { Colors } from "../styles/colors";
import { useForm, UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { createSectionTitle } from "../helpers/createSectionTitle";
import { useAppContext } from "../context/AppContext";
import { LoadDatasetFirst } from "./LoadDatasetFirst";
import { FOUR_STEPS } from "../constants/fourSteps";

type Props = {
  form: UseFormReturn<CFProcedure>;
};

export const CFConditionSection = ({ form }: Props) => {
  const [horizontal, setHorizontal] = useState(true);
  const { getDatasetProcessed } = useAppContext();

  const datasetProcessed = getDatasetProcessed();

  const max = datasetProcessed ? datasetProcessed.data.length - 1 : 1;

  const conjunction = form.watch("conjunction");

  const targetValue = form.watch("condition.targetAttribute");

  if (!datasetProcessed)
    return (
      <SectionBox title={createSectionTitle(FOUR_STEPS.condition)}>
        <Box />
      </SectionBox>
    );

  return (
    <SectionBox
      title={createSectionTitle(FOUR_STEPS.condition)}
      leftSection={<CFConditionSettings form={form} max={max} />}
      minHeight={300}
      rightUpperTools={
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          {!targetValue && <Typography px={1}>Don't forget to add target attribute!</Typography>}
          <BootstrapTooltip title={"Change view "}>
            <IconButton
              onClick={() => setHorizontal(!horizontal)}
              sx={{
                height: 30,
                width: 30,
              }}
            >
              <ArrowCircleRight
                sx={{
                  transform: horizontal ? "rotate(90deg)" : undefined,
                  color: Colors.white,
                }}
              />
            </IconButton>
          </BootstrapTooltip>
        </Stack>
      }
    >
      <ConditionBuilder
        form={form}
        attributeData={datasetProcessed.data}
        conjunction={conjunction}
        horizontal={horizontal}
      />
    </SectionBox>
  );
};
