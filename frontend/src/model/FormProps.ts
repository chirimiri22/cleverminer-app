import { FieldPathByValue, FieldValues, UseFormReturn } from "react-hook-form";

export type FormProps<TFormValues extends FieldValues, TValue> = {
  name: FieldPathByValue<TFormValues, TValue>;
  form: UseFormReturn<TFormValues>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
};
