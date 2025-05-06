import {
  Stack,
  TextField,
  MenuItem,
  Typography,
  Slider,
  Select,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Collapse,
} from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { RangeSliderInput } from "../Input/RangeSliderInput";
import { AttributeData } from "../../model/AttributeData";
import { SelectInput, SelectOption } from "../Input/SelectInput";
import { CFConditionAttributes } from "../../model/CFConditionAttributes";
import { useState } from "react";
import { Check, Edit, GetAppRounded } from "@mui/icons-material";

enum TypeOptions {
  Lcut = "lcut",
  Rcut = "rcut",
  Seq = "seq",
  Subset = "subset",
  Oneof = "one",
}

type ConditionCardProps = {
  form: UseFormReturn<CFConditionAttributes>;
  index: number;
  attributeData: AttributeData[];
};

export function ConditionCard({ form, index, attributeData }: ConditionCardProps) {
  const options: SelectOption[] = attributeData.map((x) => ({
    label: x.title,
    value: x.title,
  }));

  const typeOptions: SelectOption[] = Object.values(TypeOptions).map((opt) => ({
    label: opt,
    value: opt,
  }));

  const currentCardData = form.watch(`conditionAttributes.${index}`);
  const [editAttributeMode, setEditAttributeMode] = useState(!currentCardData.attribute);

  const handleToggleAttributeSelect = () => {
    setEditAttributeMode((prev) => !prev);
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 200, flexGrow: 0, borderRadius: 2, height: "fit-content" }}>
      <CardHeader
        title={
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1} gap={1}>
              {editAttributeMode && (
                <>
                  <SelectInput
                    name={`conditionAttributes.${index}.attribute`}
                    form={form}
                    options={options}
                    label={"Attribute"}
                  />
                  <IconButton onClick={() => setEditAttributeMode(false)} size="small">
                    <Check fontSize={"small"} />
                  </IconButton>
                </>
              )}
              {!editAttributeMode && (
                <>
                  {currentCardData.attribute}

                  <IconButton onClick={() => setEditAttributeMode(true)} size="small">
                    <Edit fontSize={"small"} />
                  </IconButton>
                </>
              )}
            </Stack>
          </Stack>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <SelectInput name={`conditionAttributes.${index}.type`} form={form} options={typeOptions} label={"Type"} />

        <RangeSliderInput form={form} name={`conditionAttributes.${index}.range`} max={5} />
      </CardContent>
    </Card>
  );
}
