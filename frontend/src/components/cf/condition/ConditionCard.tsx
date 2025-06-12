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
import { RangeSliderInput } from "../../common/input/RangeSliderInput";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { SelectInput, SelectOption } from "../../common/input/SelectInput";
import { CFCondition } from "../../../model/cf/condition/CFCondition";
import React from "react";
import { TypeOptions } from "../../../constants/enums/TypeOptions";
import { CFProcedure } from "../../../model/cf/condition/CFProcedure";

type ConditionCardProps = {
  form: UseFormReturn<CFProcedure>;
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

  const currentCardData = form.watch(`condition.conditionAttributes.${index}`);
  const categoriesCount = attributeData.find((x) => x.title === currentCardData.attribute)?.categories.length ?? 1;
  return (
    <Card variant="outlined" sx={{ minWidth: 200, flexGrow: 0, borderRadius: 2, height: "fit-content" }}>
      <CardHeader
        sx={{
          pb: 1,
        }}
        title={
          <SelectInput
            name={`condition.conditionAttributes.${index}.attribute`}
            form={form}
            options={attributeOptions}
            label={"Attribute"}
            size={"medium"}
          />
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, pt: 1 }}>
        <SelectInput name={`condition.conditionAttributes.${index}.type`} form={form} options={typeOptions} label={"Type"} />

        <RangeSliderInput
          form={form}
          name={`condition.conditionAttributes.${index}.range`}
          max={categoriesCount}
          label={"Range"}
          hideLabels={categoriesCount > 10}
        />
      </CardContent>
      <CardActions>
        <Button
          color={"error"}
          onClick={() => onRemove(index)}
          disabled={form.watch("condition.conditionAttributes").length === 1}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
