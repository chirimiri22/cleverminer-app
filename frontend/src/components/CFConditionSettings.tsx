import { UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../model/CFProcedure";
import { Stack, Typography } from "@mui/material";
import { BooleanInput } from "./Input/BooleanInput";
import { RangeSliderInput } from "./Input/RangeSliderInput";
import { CFQuantifiersSection } from "./CFQuantifiersSection";
import { Subtitle } from "./Subtitle";

type Props = {
  max: number;
  form: UseFormReturn<CFProcedure>;
};

export const CFConditionSettings = ({ max, form }: Props) => {
  return (
    <Stack gap={2}>
      <Subtitle title={"Settings"} />
      <Stack gap={1} alignItems={"center"}>
        <BooleanInput form={form} name={"conjunction"} label1={"OR"} label2={"AND"} />
        <RangeSliderInput max={max} form={form} name={"range"} />
      </Stack>

      <Subtitle title={"Quantifiers"} />
      <Stack gap={1}>
        <CFQuantifiersSection form={form} />
      </Stack>
    </Stack>
  );
};
