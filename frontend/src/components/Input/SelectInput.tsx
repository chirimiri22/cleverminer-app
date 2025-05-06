import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { Colors } from "../../styles/colors";
import { FormProps } from "../../model/FormProps";

export type SelectOption = { label: string; value: string, hidden?: boolean };

// select works with string values only
type Props<TFormValues extends FieldValues, TValue = string> = FormProps<TFormValues, TValue> & {
  onBlur?: () => void;
  onChange?:() => void;
  options: SelectOption[];

};

export const SelectInput = <TFormValues extends FieldValues, TValue>({
                                                                       form,
                                                                       label,
                                                                       name,
                                                                       onBlur,
                                                                       options,
                                                                       onChange,
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
            label={label}
            sx={{ backgroundColor: Colors.white }}
            value={field.value ?? ""} // show '' if undefined
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : value); // convert back to undefined
              onChange?.();
            }}
            onBlur={() => {
              field.onBlur();
              onBlur && onBlur();
            }}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option.value} sx={{ display: option.hidden ? "none" : "block" }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
