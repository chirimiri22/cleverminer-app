import { Stack, Switch } from "@mui/material";
import { FieldValues, PathValue } from "react-hook-form";
import { FormProps } from "../../model/FormProps";
import { ChangeEvent } from "react";

type Props<TFormValues extends FieldValues> = FormProps<TFormValues, boolean> & {
  label1?: string;
  label2?: string;
  id?: string;
  twoStates?: true;
  disabled?: boolean;
};

export const BooleanInput = <TFormValues extends FieldValues>({
  form,
  name,
  label1,
  label2,
  id,
  twoStates,
  disabled
}: Props<TFormValues>) => {
  const value = form.watch(name) ?? false;

  const handleChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    form.setValue(name, checked as PathValue<TFormValues, typeof name>);
  };

  return (
    <Stack id={id} direction="row" alignItems="center" sx={{ fontSize: "small" }}>
      {label1}
      <Switch
        checked={value}
        disabled={disabled}
        onChange={handleChange}
        sx={{
          // ✔️ Thumb (circle) when checked
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "primary.main",
          },
          // ✔️ Track (background) when checked
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "primary.main",
          },

          // ✔️ Thumb (circle) when unchecked
          "& .MuiSwitch-switchBase": {
            color: twoStates ? "success.main" : undefined,
          },
          // ✔️ Track (background) when unchecked
          "& .MuiSwitch-track": {
            backgroundColor: twoStates ? "success.main" : undefined,
          },
        }}
      />
      {label2}
    </Stack>
  );
};
