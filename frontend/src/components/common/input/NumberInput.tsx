import { FieldValues, Controller } from "react-hook-form";
import { Colors } from "../../../styles/colors";
import { SxProps, TextField } from "@mui/material";
import { FormProps } from "../../../model/FormProps";

type Props<TFormValues extends FieldValues, TValue> = FormProps<TFormValues, TValue> & {
  onBlur?: () => void;
  min?: number;
  max?: number;
  sx?: SxProps;
  onChange?: (value?: TValue) => void;
};

export const NumberInput = <TFormValues extends FieldValues, TValue>({
  form,
  name,
  onBlur,
  label,
  min,
  max,
  sx,
  onChange,
  disabled,
  required
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
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          id="quantifier-value"
          label={label}
          disabled={disabled}
          required={required}
          error={!!fieldState.error}
          type="number"
          size="small"
          variant={"filled"}
          slotProps={{ htmlInput: { min: min, max: max } }}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: Colors.white,
            },
            ...sx,
          }}
          value={field.value ?? ""} // ✅ avoid undefined
          onChange={(e) => {
            const parsed = e.target.value === "" ? undefined : Number(e.target.value);
            field.onChange(parsed);
            onChange && onChange(parsed as TValue);
          }}
          onBlur={() => {
            field.onBlur();
            onBlur && onBlur();
          }}
        />
      )}
    />
  );
};
