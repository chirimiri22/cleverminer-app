import { Close, PlayArrow } from "@mui/icons-material";
import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
import { AttributeData } from "../model/dataset/AttributeData";
import { LineChart } from "./LineChart";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SelectInput, SelectOption } from "./Input/SelectInput";
import { NumberInput } from "./Input/NumberInput";
import { Subtitle } from "./Subtitle";
import { BooleanInput } from "./Input/BooleanInput";
import { Category } from "../model/dataset/Category";
import { useEffect, useState } from "react";
import { AutocompleteInput } from "./Input/AutocompleteInput";
import { Colors } from "../styles/colors";
import { TextInput } from "./Input/TextInput";
import { RemoveButton } from "./RemoveButton";
import { BootstrapTooltip } from "./BootstrapTooltip";

type Props = {
  data: AttributeData;
};

type NewCategory = {
  label: string;
  selectedOptions: SelectOption[];
};

type NominalProcessingForm = {
  column: string;
  rows: NewCategory[];
};

const eachValueIsUnique = (values: string[]) => {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      return false; // Duplicate found
    }
    seen.add(value);
  }
  return true; // All values are unique
};

export const NominalPreprocessing = ({ data }: Props) => {
  const form = useForm<NominalProcessingForm>({
    defaultValues: {
      column: data.title,
      rows: [
        {
          label: "First Category",
          selectedOptions: [],
        },
      ],
    },
    mode: "onChange",
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

  const reaminitngCategoriesCount = unusedCategoriesOptions.filter((x) => !x.hidden).length;

  return (
    <Stack gap={1} alignItems={"start"}>
      <Subtitle title={"New Categories"} />
      <Chip
        label={`Remaining cat.: ${reaminitngCategoriesCount}`}
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
                <TextInput
                  name={`rows.${index}.label`}
                  form={form}
                  label={`Category #${index + 1}: Label`}
                  required={true}
                />
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
            Add A Category
          </Button>
        </Stack>
      </Stack>
      <BootstrapTooltip
        title={reaminitngCategoriesCount !== 0 && "Please select all categories to convert"}
        placement={"bottom"}
      >
        <Stack width={"100%"}>
          <Button
            variant={"contained"}
            size={"small"}
            startIcon={<PlayArrow />}
            sx={{
              width: "100%",
            }}
            disabled={
              reaminitngCategoriesCount !== 0 ||
              !form.formState.isValid ||
              !eachValueIsUnique(usedCategories.map((c) => c.label))
            }
          >
            Convert
          </Button>
        </Stack>
      </BootstrapTooltip>
    </Stack>
  );
};
