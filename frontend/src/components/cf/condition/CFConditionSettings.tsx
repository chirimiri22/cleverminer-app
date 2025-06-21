import { UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../../../model/cf/condition/CFProcedure";
import { Stack, Typography } from "@mui/material";
import { BooleanInput } from "../../common/input/BooleanInput";
import { RangeSliderInput } from "../../common/input/RangeSliderInput";
import { CFQuantifiersSection } from "./CFQuantifiersSection";
import { Subtitle } from "../../common/Subtitle";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";

type Props = {
  max: number;
  form: UseFormReturn<CFProcedure>;
};

export const CFConditionSettings = ({ max, form }: Props) => {
  return (
    <Stack gap={2} >
      <Subtitle title={"Settings"} />
      <Stack gap={1} alignItems={"center"}>
        <BooleanInput form={form} name={"conjunction"} label1={"OR"} label2={"AND"} twoStates />
        <RangeSliderInput max={max} form={form} name={"range"} />
        <BootstrapTooltip placement={"bottom"} title={"Generate Cleverminer native images for the rules. It can slow down the process."}>
          <Stack>
            <BooleanInput name={"generateImages"} form={form} label2={"Generate Images"} />
          </Stack>
        </BootstrapTooltip>
      </Stack>

      <Subtitle title={"Quantifiers"} />
      <Stack gap={1}>
        <CFQuantifiersSection form={form} />
      </Stack>
    </Stack>
  );
};
