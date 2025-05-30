
import { Button, IconButton, Stack } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { NumberInput } from "./Input/NumberInput";
import { Subtitle } from "./Subtitle";
import { RemoveButton } from "./RemoveButton";

type FormValues = {
  ranges: { from: number; to: number }[];
};

export const CategorizationInput = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      ranges: [{ from: 0, to: 10 }],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranges",
  });

  const onRemove = (index: number) => {
    if (fields.length > 1) remove(index);
  };
  return (
    <Stack alignItems="start">
      <Subtitle title={"Set new intervals"} />
      {fields.map((field, index) => (
        <Stack key={field.id} direction="row" gap={2} alignItems="center" mb={2}>
          <NumberInput form={form} name={`ranges.${index}.from`} label="From" />
          <NumberInput form={form} name={`ranges.${index}.to`} label="To" />
          <RemoveButton onRemove={() => onRemove(index)} disabled={index === 0} />
        </Stack>
      ))}
      <Button onClick={() => append({ from: 0, to: 1 })}>Add Row</Button>
    </Stack>
  );
};
