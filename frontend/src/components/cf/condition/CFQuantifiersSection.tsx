import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { CFQuantifier } from "../../../constants/enums/CFQuantifier";
import { Button, Stack } from "@mui/material";
import { CFProcedure } from "../../../model/cf/condition/CFProcedure";
import { QuantifierRow } from "./QuantifierRow";
import { SelectOption } from "../../common/input/SelectInput";

// todo: i dont like this at all
const getAvailableQ = (watchedQuantifiers: (CFQuantifier | undefined)[]): CFQuantifier[] => {
  const allQuantifiers = Object.values(CFQuantifier);

  return allQuantifiers.filter((item) => !watchedQuantifiers.includes(item));
};

type Props = {
  form: UseFormReturn<CFProcedure>;
};

export const CFQuantifiersSection = ({ form }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "quantifiers",
  });

  const watchedQuantifiers = form.watch("quantifiers").map((q) => q.quantifier);
  const options: SelectOption[] = Object.values(CFQuantifier).map((q) => ({
    label: q,
    value: q,
    hidden: watchedQuantifiers.includes(q),
  }));

  const availableQuantifiers = getAvailableQ(watchedQuantifiers);

  return (
    <Stack gap={2}>
      {fields.map((field, index) => {
        return <QuantifierRow key={field.id} form={form} index={index} options={options} onRemove={remove} />;
      })}
      {availableQuantifiers.length > 0 && (
        <Button onClick={() => append({ quantifier: availableQuantifiers[0], value: undefined })}>Add Quantifier</Button>
      )}
    </Stack>
  );
};
