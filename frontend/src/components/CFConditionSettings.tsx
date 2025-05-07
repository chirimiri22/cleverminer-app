import { useForm } from "react-hook-form";
import { CFProcedure } from "../model/CFProcedure";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { Stack, Typography } from "@mui/material";
import { BooleanInput } from "./Input/BooleanInput";
import { RangeSliderInput } from "./Input/RangeSliderInput";
import { CFQuantifiersSection } from "./CFQuantifiersSection";

type Props = {
  max: number;
}

export const CFConditionSettings = ({max} : Props) => {
  const form = useForm<CFProcedure>({
    defaultValues: {
      quantifiers: [{ quantifier: CFQuantifier.Base, value: undefined }],
    },
  });

  return (
    <Stack gap={2}>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        Settings
      </Typography>
      <Stack gap={1}  alignItems={"center"}>
        <BooleanInput form={form} name={"conjunction"} label1={"OR"} label2={"AND"} />
        <RangeSliderInput max={max} form={form} name={"range"} />
      </Stack>

      <Typography variant="subtitle1" fontWeight={"bold"}>
        Quantifiers
      </Typography>
      <Stack gap={1} >
        <CFQuantifiersSection form={form} />
      </Stack>
    </Stack>
  );
};
