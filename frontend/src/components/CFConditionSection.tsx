import { CFConditionSettings } from "./CFConditionSettings";

import { ConditionBuilder } from "./CFConditionBuilder";
import { SectionBox } from "./SectionBox";
import { useState } from "react";
import { BootstrapTooltip } from "./BootstrapTooltip";
import { IconButton } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import { Colors } from "../styles/colors";
import { useForm } from "react-hook-form";
import { CFProcedure } from "../model/CFProcedure";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { createSectionTitle, FOUR_STEPS } from "../pages/ProcedureCFMiner";
import { useAppContext } from "../context/AppContext";

export const CFConditionSection = () => {
  const [horizontal, setHorizontal] = useState(true);
  const { datasetProcessed } = useAppContext();

  const form = useForm<CFProcedure>({
    defaultValues: {
      conjunction: true,
      quantifiers: [{ quantifier: CFQuantifier.Base, value: undefined }],
    },
  });

  const conjunction = form.watch("conjunction");

  if (!datasetProcessed) return <></>;
  return (
    <SectionBox
      title={createSectionTitle(FOUR_STEPS.condition)}
      leftSection={<CFConditionSettings form={form} max={datasetProcessed.data.length - 1} />}
      minHeight={300}
      rightUpperTools={
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
      }
    >
      <ConditionBuilder attributeData={datasetProcessed.data} conjunction={conjunction} horizontal={horizontal} />
    </SectionBox>
  );
};
