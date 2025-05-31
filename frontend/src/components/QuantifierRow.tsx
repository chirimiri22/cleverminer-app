import { UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { IconButton, Stack } from "@mui/material";
import { SelectInput, SelectOption } from "./Input/SelectInput";
import { NumberInput } from "./Input/NumberInput";
import { Close } from "@mui/icons-material";
import { RemoveButton } from "./RemoveButton";

type Props = {
  form: UseFormReturn<CFProcedure>;
  index: number;
  options: SelectOption[];
  onRemove: (index: number) => void;
};

export const QuantifierRow = ({ form, index, options, onRemove }: Props) => {
  const fieldName = `quantifiers.${index}` as const;

  return (
    <Stack direction="row" sx={{ gap: 1 }} alignItems={"center"}>
      <SelectInput label="Quantifier" form={form} name={`${fieldName}.quantifier`} options={options} />
      <NumberInput
        label="Value"
        form={form}
        name={`${fieldName}.value`}
        min={0}
        onBlur={() => console.log(form.getValues())}
        sx={{
          maxWidth: 60,
        }}
      />
      <RemoveButton onRemove={() => onRemove(index)} disabled={index === 0} />
    </Stack>
  );
};
