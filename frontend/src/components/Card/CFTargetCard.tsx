import { Stack, Typography, TextField, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { SelectInput, SelectOption } from "../Input/SelectInput";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CFProcedure } from "../../model/CFProcedure";
import { CFConditionAttributes } from "../../model/CFConditionAttributes";
import { Colors } from "../../styles/colors";

type Props = {
  form: UseFormReturn<CFConditionAttributes>;
  attributeOptions: SelectOption[];
};

export const CFTargetCard = ({ form, attributeOptions }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 200, flexGrow: 0, borderRadius: 2, height: "fit-content", borderColor: Colors.success }}
    >
      <CardHeader
        sx={{
          pb: 2,
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
