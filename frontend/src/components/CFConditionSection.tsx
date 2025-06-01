import { CFConditionSettings } from "./CFConditionSettings";

import { ConditionBuilder } from "./CFConditionBuilder";
import { SectionBox } from "./SectionBox";
import { useState } from "react";
import { BootstrapTooltip } from "./BootstrapTooltip";
import { IconButton, Stack } from "@mui/material";
import { ArrowCircleRight, PlayArrow } from "@mui/icons-material";
import { Colors } from "../styles/colors";
import { useForm } from "react-hook-form";
import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { createSectionTitle, FOUR_STEPS } from "../pages/ProcedureCFMiner";
import { useAppContext } from "../context/AppContext";
import { startCFProcedure } from "../apiCalls/startCFProcedure";
import { TypeOptions } from "../constants/enums/TypeOptions";

export const CFConditionSection = () => {
  const [horizontal, setHorizontal] = useState(true);
  const { datasetProcessed, datafile, setCFResults } = useAppContext();

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
  });

  const conjunction = form.watch("conjunction");

  const handleStart = async () => {
    if (datafile) {
      const res = await startCFProcedure(form.getValues(), datafile);

      setCFResults(res);
    }
  };

  if (!datasetProcessed) return <></>;
  return (
    <SectionBox
      title={
        <Stack direction={"row"} gap={2} alignItems={"end"}>
          {createSectionTitle(FOUR_STEPS.condition)}
          <IconButton onClick={handleStart}>
            <PlayArrow />
          </IconButton>
        </Stack>
      }
      leftSection={<CFConditionSettings form={form} max={max} />}
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
      <ConditionBuilder
        form={form}
        attributeData={datasetProcessed.data}
        conjunction={conjunction}
        horizontal={horizontal}
      />
    </SectionBox>
  );
};
