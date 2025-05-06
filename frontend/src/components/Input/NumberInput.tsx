import { FieldValues, Controller } from "react-hook-form";
import { Colors } from "../../styles/colors";
import { TextField } from "@mui/material";
import { FormProps } from "../../model/FormProps";

type Props<TFormValues extends FieldValues, TValue> = FormProps<TFormValues, TValue> & {
  onBlur?: () => void;
  min?: number;
  max?: number;
};

export const NumberInput = <TFormValues extends FieldValues, TValue>({
  form,
  name,
  onBlur,
  min,
  max,
}: Props<TFormValues, TValue>) => {
  return (
    <Controller
      name={name}
      rules={{
        required: true,
        min: min,
        max: max,
      }}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          id="quantifier-value"
          label="Value"
          type="number"
          size="small"
          slotProps={{ htmlInput: { min: min, max: max } }}
          sx={{ backgroundColor: Colors.white }}
          onBlur={() => {
            field.onBlur();
            onBlur && onBlur();
          }}
        />
      )}
    />
  );
};
