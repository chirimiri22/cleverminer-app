import { Stack, Typography, TextField, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { SelectInput, SelectOption } from "../Input/SelectInput";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../../model/CFProcedure";
import { CFConditionAttributes } from "../../model/CFConditionAttributes";

type Props = {
  form: UseFormReturn<CFConditionAttributes>;
  attributeOptions: SelectOption[];
};

export const CFTargetCard = ({ form, attributeOptions }: Props) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 200, flexGrow: 0, borderRadius: 2, height: "fit-content" }}>
      <CardHeader
        sx={{
          pb: 1,
        }}
        title={
          <SelectInput
            name={`targetAttribute`}
            form={form}
            options={attributeOptions}
            label={"Target Attribute"}
            size={"medium"}
          />
        }
      />
    </Card>
  );
};
