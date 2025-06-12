import { FieldValues, Controller } from "react-hook-form";
import { TextField, SxProps } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { FormProps } from "../../../model/FormProps";

type Props<TFormValues extends FieldValues, TValue = string> = FormProps<TFormValues, TValue> & {
  onBlur?: () => void;
  label: string;
  sx?: SxProps;
};

export const TextInput = <TFormValues extends FieldValues, TValue>({
  form,
  name,
  onBlur,
  label,
  sx,
  required
}: Props<TFormValues, TValue>) => {
  return (
    <Controller
      name={name}
      rules={{ required: ":(" }}

      control={form.control}
      render={({ field, fieldState}) => (
        <TextField
          {...field}
          required={required}
          error={!!fieldState.error}
          id={`${name}-text`}
          label={label}
          type="text"
          size="small"
          variant="filled"
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "transparent",
            },
            ...sx,
          }}
          value={field.value ?? ""} // Avoid undefined
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === "" ? undefined : value);
          }}
          onBlur={() => {
            field.onBlur();
            onBlur?.();
          }}
        />
      )}
    />
  );
};
