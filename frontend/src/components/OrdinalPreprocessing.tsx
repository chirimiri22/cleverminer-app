import { PlayArrow } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { AttributeData } from "../model/AttributeData";
import { LineChart } from "./LineChart";
import { useForm } from "react-hook-form";
import { SelectInput, SelectOption } from "./Input/SelectInput";
import { NumberInput } from "./Input/NumberInput";
import { Subtitle } from "./Subtitle";
import { BooleanInput } from "./Input/BooleanInput";
import { Category } from "../model/Category";
import { useEffect, useState } from "react";

type Props = {
  data: AttributeData;
};

export enum Categorization {
  Equidistant = "Equidistant",
  Equifrequent = "Equifrequent",
  // Custom,
}

type FormData = {
  ordered: boolean;
  categoryCount: number;
  categorization: Categorization;
};

export const OrdinalPreprocessing = ({ data }: Props) => {
  const form = useForm<FormData>({
    defaultValues: {
      ordered: false,
      categoryCount: 5,
      categorization: Categorization.Equidistant,
    },
  });

  const categorizationOptions: SelectOption[] = Object.keys(Categorization)
    .filter((key) => isNaN(Number(key))) // Filter out reverse mapping (numbers) from enums
    .map((key) => ({
      label: key,
      value: key,
    }));

  const groupingMode = form.watch("categorization");
  const groupingCount = form.watch("categoryCount");
  console.log(groupingCount, groupingMode);

  const [orderCategories, setOrderedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const newArray = [...data.categories];
    newArray.sort((a, b) => a.label.localeCompare(b.label));
    setOrderedCategories(newArray);
  }, [data.categories]);

  const categories = form.watch("ordered") ? orderCategories : data.categories;

  return (
    <Stack gap={1} alignItems={"start"}>
      <Subtitle title={"Preview"} />
      <LineChart categories={categories} groupingCount={groupingCount} groupingMode={groupingMode} />
      <Subtitle title={"Generate Categories"} />
      {/*todo ordinal categorization */}
      <BooleanInput name={"ordered"} form={form} label2={"Order According To Labels"} />
      <Stack direction={"row"} gap={1}>
        <Stack flex={2}>
          <SelectInput name={"categorization"} form={form} options={categorizationOptions} label={"Categorization"} />
        </Stack>
        <Stack flex={1}>
          <NumberInput name={"categoryCount"} form={form} min={1} label={"Count"} />
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
