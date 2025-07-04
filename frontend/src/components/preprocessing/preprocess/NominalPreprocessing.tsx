import { Close, ErrorOutline, PlayArrow } from "@mui/icons-material";
import { Button, Chip, IconButton, Stack, TextField, Typography } from "@mui/material";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { LineChart } from "../../common/charts/LineChart";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SelectInput, SelectOption } from "../../common/input/SelectInput";
import { NumberInput } from "../../common/input/NumberInput";
import { Subtitle } from "../../common/Subtitle";
import { BooleanInput } from "../../common/input/BooleanInput";
import { Category } from "../../../model/dataset/Category";
import React, { useEffect, useState } from "react";
import { AutocompleteInput } from "../../common/input/AutocompleteInput";
import { Colors } from "../../../styles/colors";
import { TextInput } from "../../common/input/TextInput";
import { RemoveButton } from "../../common/RemoveButton";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";
import { sendCategorizeRequest } from "../../../apiCalls/generateCategories";
import { getProcessedAttribute } from "../../../apiCalls/getProcessedAttribute";
import { createCustomNominalCategories } from "../../../apiCalls/createCustomNominalCategories";
import { useAppContext } from "../../../context/AppContext";
import { Histogram } from "../../common/charts/Histogram";
import { apiCallWrapper } from "../../../apiCalls/apiCallWrapper";
import { ErrorMessage } from "./ErrorMessage";

type Props = {
  data: AttributeData;
};

export type NewCategory = {
  label: string;
  selectedOptions: SelectOption[];
};

type NominalProcessingForm = {
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
  const { datafile, setDatafile, updateProcessedAttributeData, getDatasetProcessed } = useAppContext();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<NominalProcessingForm>({
    defaultValues: {
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

  const handleConvert = async () => {
    setError(undefined);
    if (!datafile) return;
    const newFile = await apiCallWrapper(
      () => createCustomNominalCategories(usedCategories, data.title, datafile),
      setError
    );
    if (!newFile) return;
    const newProcessedData = await apiCallWrapper(
      () => getProcessedAttribute(data.title, newFile, !!data.hidden),
      setError
    );
    if (!newProcessedData) return;
    setDatafile(newFile);
    updateProcessedAttributeData(data.title, newProcessedData);
    form.reset();
  };
  return (
    <Stack gap={1} alignItems={"start"}>
      <Histogram categories={data.categories} showYAxis datalabels />
      <Subtitle title={"New Categories"} smaller />
      <Chip
        label={`Remaining: ${reaminitngCategoriesCount}`}
        size="small"
        variant={"outlined"}
        color={"primary"}
        sx={{ mb: 1, alignSelf: "center" }}
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
                required
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
              mt: 1,
              width: "100%",
            }}
            disabled={
              reaminitngCategoriesCount !== 0 ||
              !form.formState.isValid ||
              !eachValueIsUnique(usedCategories.map((c) => c.label))
            }
            onClick={handleConvert}
          >
            Convert
          </Button>
        </Stack>
      </BootstrapTooltip>
      {error && <ErrorMessage error={error} />}
    </Stack>
  );
};
