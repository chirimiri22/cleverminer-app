import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { Colors } from "../../styles/colors";
import { FormProps } from "../../model/FormProps";

export type Option = { label: string; value: string };

// select works with string values only
type Props<TFormValues extends FieldValues, TValue = string> = FormProps<TFormValues, TValue> & {
  onBlur?: () => void;
  options: Option[];
};

export const SelectInput = <TFormValues extends FieldValues, TValue>({
  form,
  label,
  name,
  onBlur,
  options,
}: Props<TFormValues, TValue>) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="quantifier-select-label">{label}</InputLabel>
      <Controller
        name={name}
        rules={{ required: true }}
        control={form.control}
        render={({ field }) => (
          <Select
            {...field}
            labelId="quantifier-select-label"
            id="quantifier-select"
            label="Quantifier"
            sx={{ backgroundColor: Colors.white }}
            onBlur={() => {
              field.onBlur(); // call internal RHF blur handler
              onBlur && onBlur(); // call your custom blur handler
            }}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
