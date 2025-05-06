import { Stack, Switch } from "@mui/material";
import { FieldValues, PathValue } from "react-hook-form";
import { FormProps } from "../../model/FormProps";
import { ChangeEvent } from "react";

type Props<TFormValues extends FieldValues> = FormProps<TFormValues, boolean> & {
  label1?: string;
  label2?: string;
};

export const BooleanInput = <TFormValues extends FieldValues>({ form, name, label1, label2 }: Props<TFormValues>) => {
  const value = form.watch(name);

  const handleChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    form.setValue(name, checked as PathValue<TFormValues, typeof name>);
  };

  return (
    <Stack direction="row" alignItems="center" sx={{ fontSize: "small" }}>
      {label1}
      <Switch checked={value} onChange={handleChange} />
      {label2}
    </Stack>
  );
};
