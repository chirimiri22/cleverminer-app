import { CFConditionSettings } from "./CFConditionSettings";

import { ConditionBuilder } from "./CFConditionBuilder";
import { SectionBox } from "../../common/SectionBox";
import { useState } from "react";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowCircleRight, PlayArrow } from "@mui/icons-material";
import { Colors } from "../../../styles/colors";
import { useForm, UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../../../model/cf/condition/CFProcedure";
import { createSectionTitle } from "../../../helpers/createSectionTitle";
import { useAppContext } from "../../../context/AppContext";
import { FOUR_STEPS } from "../../../constants/fourSteps";

type Props = {
  form: UseFormReturn<CFProcedure>;
};

export const CFConditionSection = ({ form }: Props) => {
  const [horizontal, setHorizontal] = useState(true);
  const { getDatasetProcessed } = useAppContext();

  const datasetProcessed = getDatasetProcessed();

  const max = datasetProcessed ? datasetProcessed.data.length - 1 : 1;

  const conjunction = form.watch("conjunction");

  return (
    <SectionBox
      title={createSectionTitle(FOUR_STEPS.condition)}
      leftSection={datasetProcessed && <CFConditionSettings form={form} max={max} />}
      minHeight={datasetProcessed ? 300 : 0}
      rightUpperTools={
        datasetProcessed && (
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
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
        )
      }
    >
      {datasetProcessed ? (
        <ConditionBuilder
          form={form}
          attributeData={datasetProcessed.data}
          conjunction={conjunction}
          horizontal={horizontal}
        />
      ) : (
        <Box />
      )}
    </SectionBox>
  );
};
