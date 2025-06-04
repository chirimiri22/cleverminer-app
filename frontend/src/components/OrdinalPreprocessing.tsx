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
import { useCallback, useEffect, useState } from "react";
import { Histogram } from "./Histogram";
import { sendCategorizeRequest } from "../apiCalls/generateCategories";
import { useAppContext } from "../context/AppContext";
import { getProcessedAttribute } from "../apiCalls/getProcessedAttribute";
import { previewCategories } from "../apiCalls/previewCategories";
import { BootstrapTooltip } from "./BootstrapTooltip";

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

  const form = useForm<CategorizationFormData>({
    defaultValues: {
      categoryCount: 5,
      categorization: Categorization.Equidistant,
      column: data.title,
    },
  });

  const formValues = form.watch();

  const [divisionRanges, setDivisionRanges] = useState<[number, number][] | undefined>();

  const handleFormChange = useCallback(async () => {
    const formValues1 = form.getValues();
    if (!data.numeric || !datafile || formValues1.categoryCount >= data.categories.length) return;
    const response = await previewCategories(formValues1, datafile);

    setDivisionRanges(response.category_ranges);
  }, [data.categories.length, data.numeric, datafile, form]);

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
      <Subtitle title={"Preview"} />
      <Histogram categories={data.categories} showYAxis divisionRanges={divisionRanges} datalabels />
      <Subtitle title={"Generate Categories"} />
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
            }}
            onClick={handleConvert}
            disabled={!data.numeric}
          >
            Convert
          </Button>
        </Stack>
      </BootstrapTooltip>
    </Stack>
  );
};
