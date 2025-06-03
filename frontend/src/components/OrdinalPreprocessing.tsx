import { PlayArrow } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { AttributeData } from "../model/dataset/AttributeData";
import { LineChart } from "./LineChart";
import { useForm } from "react-hook-form";
import { SelectInput, SelectOption } from "./Input/SelectInput";
import { NumberInput } from "./Input/NumberInput";
import { Subtitle } from "./Subtitle";
import { BooleanInput } from "./Input/BooleanInput";
import { Category } from "../model/dataset/Category";
import { useEffect, useState } from "react";
import { Histogram } from "./Histogram";
import { sendCategorizeRequest } from "../apiCalls/generateCategories";
import { useAppContext } from "../context/AppContext";
import { getProcessedAttribute } from "../apiCalls/getProcessedAttribute";
import { previewCategories } from "../apiCalls/previewCategories";

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
  const { datafile, setDatafile, updateProcessedAttributeData, getDatasetProcessed } = useAppContext();

  const form = useForm<CategorizationFormData>({
    defaultValues: {
      categoryCount: 5,
      categorization: Categorization.Equidistant,
      column: data.title,
    },
  });

  const formValues = form.watch();

  const [divisionRanges, setDivisionRanges] = useState<[number, number][] | undefined>();

  useEffect(() => {
    console.log(data.title);
    if (!data.numeric || !datafile || formValues.categoryCount >= data.categories.length) return;
    previewCategories(formValues, datafile).then((data) => {
      setDivisionRanges(data.category_ranges);
    });
    //   todo: fix this dependency, it causes infinite loop
    // eslint-disable-next-line
  }, [datafile, JSON.stringify(formValues)]);

  const categorizationOptions: SelectOption[] = Object.keys(Categorization)
    .filter((key) => isNaN(Number(key))) // Filter out reverse mapping (numbers) from enums
    .map((key) => ({
      label: key,
      value: key,
    }));

  const handleConvertt = async () => {
    if (datafile) {
      try {
        const newFile = await sendCategorizeRequest(formValues, datafile);
        setDatafile(newFile);
        const newProcessedData = await getProcessedAttribute(formValues.column, newFile);
        updateProcessedAttributeData(formValues.column, newProcessedData);
      } catch (error) {
        console.error("Error during categorization:", error);
      }
    }
  };

  return (
    <Stack gap={1} alignItems={"start"} textAlign={"start"}>
      <Subtitle title={"Generate Categories"} />
      <Stack direction={"row"} gap={1}>
        <Stack flex={2}>
          <SelectInput name={"categorization"} form={form} options={categorizationOptions} label={"Categorization"} />
        </Stack>
        <Stack flex={1}>
          <NumberInput name={"categoryCount"} form={form} min={1} label={"Count"} />
        </Stack>
      </Stack>

      <Subtitle title={"Preview"} />
      <Histogram categories={data.categories} divisionRanges={divisionRanges} datalabels />

      <Button
        variant={"contained"}
        size={"small"}
        startIcon={<PlayArrow />}
        sx={{
          width: "100%",
        }}
        onClick={handleConvertt}
      >
        Convert
      </Button>
    </Stack>
  );
};
