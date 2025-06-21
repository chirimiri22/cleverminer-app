import { ErrorOutline, PlayArrow } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { LineChart } from "../../common/charts/LineChart";
import { useForm } from "react-hook-form";
import { SelectInput, SelectOption } from "../../common/input/SelectInput";
import { NumberInput } from "../../common/input/NumberInput";
import { Subtitle } from "../../common/Subtitle";
import { BooleanInput } from "../../common/input/BooleanInput";
import { Category } from "../../../model/dataset/Category";
import React, { useCallback, useEffect, useState } from "react";
import { Histogram } from "../../common/charts/Histogram";
import { sendCategorizeRequest } from "../../../apiCalls/generateCategories";
import { useAppContext } from "../../../context/AppContext";
import { getProcessedAttribute } from "../../../apiCalls/getProcessedAttribute";
import { previewCategories } from "../../../apiCalls/previewCategories";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";
import { apiCallWrapper } from "../../../apiCalls/apiCallWrapper";
import { ErrorMessage } from "./ErrorMessage";

type Props = {
  data: AttributeData;
};

export enum Categorization {
  Equidistant = "Equidistant",
  Equifrequent = "Equifrequent",
}

export type CategorizationFormData = {
  categoryCount: number;
  categorization: Categorization;
  column: string;
};

export const OrdinalPreprocessing = ({ data }: Props) => {
  const { datafile, setDatafile, updateProcessedAttributeData } = useAppContext();
  const [error, setError] = useState<string | undefined>(undefined);
  const [divisionRanges, setDivisionRanges] = useState<[number, number][] | undefined>();

  const form = useForm<CategorizationFormData>({
    defaultValues: {
      categoryCount: 5,
      categorization: Categorization.Equidistant,
      column: data.title,
    },
  });

  const formValues = form.watch();

  const handleFormChange = useCallback(async () => {
    const formValues1 = form.getValues();
    if (!data.numeric || !datafile || formValues1.categoryCount >= data.categories.length) return;
    const response = await apiCallWrapper(() => previewCategories(formValues1, datafile), setError);

    setDivisionRanges(response?.category_ranges);
  }, [data.categories.length, data.numeric, datafile, form]);

  //  todo: why it sends  requests
  useEffect(() => {
    handleFormChange();
  }, []);

  const categorizationOptions: SelectOption[] = Object.keys(Categorization)
    .filter((key) => isNaN(Number(key))) // Filter out reverse mapping (numbers) from enums
    .map((key) => ({
      label: key,
      value: key,
    }));

  const handleConvert = async () => {
    setError(undefined);
    if (!datafile) return;
    const newFile = await apiCallWrapper(() => sendCategorizeRequest(formValues, datafile), setError);
    if (!newFile) return;
    const newProcessedData = await apiCallWrapper(
      () => getProcessedAttribute(formValues.column, newFile, !!data.hidden),
      setError
    );
    if (!newProcessedData) return;
    setDatafile(newFile);
    updateProcessedAttributeData(formValues.column, newProcessedData);
  };

  return (
    <Stack gap={1} alignItems={"start"} textAlign={"start"}>
      <Histogram categories={data.categories} showYAxis divisionRanges={divisionRanges} datalabels />
      <Subtitle title={"Generate Categories"} smaller />
      <Stack direction={"row"} gap={1}>
        <Stack flex={2}>
          <SelectInput
            name={"categorization"}
            form={form}
            options={categorizationOptions}
            label={"Categorization"}
            onChange={handleFormChange}
            disabled={!data.numeric}
          />
        </Stack>
        <Stack flex={1}>
          <NumberInput
            name={"categoryCount"}
            form={form}
            min={1}
            label={"Count"}
            onChange={handleFormChange}
            disabled={!data.numeric}
          />
        </Stack>
      </Stack>

      <BootstrapTooltip
        placement={"bottom"}
        title={!data.numeric && "This attribute is not numeric anymore. Cannot be converted."}
      >
        <Stack direction={"row"} flexGrow={1} width={"100%"}>
          <Button
            variant={"contained"}
            size={"small"}
            startIcon={<PlayArrow />}
            sx={{
              width: "100%",
              mt: 1,
            }}
            onClick={handleConvert}
            disabled={!data.numeric}
          >
            Convert
          </Button>
        </Stack>
      </BootstrapTooltip>
      {error && <ErrorMessage error={error} />}
    </Stack>
  );
};
