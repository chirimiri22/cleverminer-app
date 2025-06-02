import { Card, CardHeader } from "@mui/material";
import { SelectInput, SelectOption } from "../Input/SelectInput";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CFCondition } from "../../model/cf/condition/CFCondition";
import { Colors } from "../../styles/colors";
import { CFProcedure } from "../../model/cf/condition/CFProcedure";

type Props = {
  form: UseFormReturn<CFProcedure>;
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
            name={`condition.targetAttribute`}
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
