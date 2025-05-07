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
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { RangeSliderInput } from "../Input/RangeSliderInput";
import { AttributeData } from "../../model/AttributeData";
import { SelectInput, SelectOption } from "../Input/SelectInput";
import { CFConditionAttributes } from "../../model/CFConditionAttributes";
import React from "react";
import { TypeOptions } from "../../constants/enums/TypeOptions";

type ConditionCardProps = {
  form: UseFormReturn<CFConditionAttributes>;
  index: number;
  attributeData: AttributeData[];
  attributeOptions: SelectOption[];
  onRemove: (index: number) => void;
};

export const ConditionCard = ({ form, index, attributeData, attributeOptions, onRemove }: ConditionCardProps) => {
  const typeOptions: SelectOption[] = Object.values(TypeOptions).map((opt) => ({
    label: opt,
    value: opt,
  }));

  const currentCardData = form.watch(`conditionAttributes.${index}`);
  const categoriesCount = attributeData.find((x) => x.title === currentCardData.attribute)?.categories.length ?? 1;
  return (
    <Card variant="outlined" sx={{ minWidth: 200, flexGrow: 0, borderRadius: 2, height: "fit-content" }}>
      <CardHeader
        sx={{
          pb: 1,
        }}
        title={
          <SelectInput
            name={`conditionAttributes.${index}.attribute`}
            form={form}
            options={attributeOptions}
            label={"Attribute"}
            size={"medium"}
          />
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, pt: 1 }}>
        <SelectInput name={`conditionAttributes.${index}.type`} form={form} options={typeOptions} label={"Type"} />

        <RangeSliderInput
          form={form}
          name={`conditionAttributes.${index}.range`}
          max={categoriesCount}
          label={"Range"}
          hideLabels={categoriesCount > 10}
        />
      </CardContent>
      <CardActions>
        <Button
          color={"error"}
          onClick={() => onRemove(index)}
          disabled={form.watch("conditionAttributes").length === 1}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
