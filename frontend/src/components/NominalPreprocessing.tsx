import { Close, PlayArrow } from "@mui/icons-material";
import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
import { AttributeData } from "../model/AttributeData";
import { LineChart } from "./LineChart";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SelectInput, SelectOption } from "./Input/SelectInput";
import { NumberInput } from "./Input/NumberInput";
import { Subtitle } from "./Subtitle";
import { BooleanInput } from "./Input/BooleanInput";
import { Category } from "../model/Category";
import { useEffect, useState } from "react";
import { AutocompleteInput } from "./Input/AutocompleteInput";
import { Colors } from "../styles/colors";
import { TextInput } from "./Input/TextInput";
import { RemoveButton } from "./RemoveButton";

type Props = {
  data: AttributeData;
};

type FormValues = {
  rows: {
    selectedOptions: SelectOption[];
    label: string;
  }[];
};

export const NominalPreprocessing = ({ data }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      rows: [
        {
          label: "",
          selectedOptions: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const usedCategories = form.watch("rows");
  const usedLabels = usedCategories.flatMap((row) => row.selectedOptions.map((option) => option.label));

  const unusedCategoriesOptions = data.categories.map((x) => ({
    label: x.label,
    value: x.label,
    hidden: !!usedLabels.includes(x.label),
  }));

  return (
    <Stack gap={1} alignItems={"start"}>
      <Subtitle title={"New Categories"} />
      <Chip
        label={`Remaining categories: ${unusedCategoriesOptions.filter((x) => !x.hidden).length}`}
        size="small"
        variant={"outlined"}
        color={"primary"}
        sx={{ mb: 1 }}
      />

      <Stack direction={"row"} gap={1}>
        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Stack key={field.id} bgcolor={Colors.background} p={1} borderRadius={2}>
              <Stack direction={"row"} alignItems="center" gap={1}>
                <TextInput name={`rows.${index}.label`} form={form} label={`Category #${index + 1}: Label`} />
                <RemoveButton onRemove={() => remove(index)} disabled={index === 0} />
              </Stack>
              <AutocompleteInput
                form={form}
                name={`rows.${index}.selectedOptions`}
                label={`Merge following`}
                options={unusedCategoriesOptions}
                size="small"
              />
            </Stack>
          ))}
          <Button variant="text" onClick={() => append({ selectedOptions: [], label: "" })}>
            Add Row
          </Button>
        </Stack>
      </Stack>
      <Button
        variant={"contained"}
        size={"small"}
        startIcon={<PlayArrow />}
        sx={{
          width: "100%",
        }}
      >
        Convert
      </Button>
    </Stack>
  );
};
