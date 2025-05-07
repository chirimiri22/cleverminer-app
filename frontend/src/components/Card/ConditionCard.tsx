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
} from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { RangeSliderInput } from "../Input/RangeSliderInput";
import { AttributeData } from "../../model/AttributeData";
import { SelectInput, SelectOption } from "../Input/SelectInput";
import { CFConditionAttributes } from "../../model/CFConditionAttributes";
import React, { useState } from "react";
import { Check, Edit, GetAppRounded } from "@mui/icons-material";
import { Colors } from "../../styles/colors";

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
            options={options}
            label={"Attribute"}
            size={"medium"}
          />
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, pt: 1 }}>
        <SelectInput name={`conditionAttributes.${index}.type`} form={form} options={typeOptions} label={"Type"} />

        <RangeSliderInput form={form} name={`conditionAttributes.${index}.range`} max={5} label={"hele"} />
      </CardContent>
    </Card>
  );
}
