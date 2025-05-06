import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Stack, Button } from "@mui/material";
import { CFTargetCard } from "./Card/CFTargetCard";
import { ConditionCard } from "./Card/ConditionCard";
import { Add, ArrowRight } from "@mui/icons-material";
import { AttributeData } from "../model/AttributeData";
import { CFConditionAttributes } from "../model/CFConditionAttributes";

type Props = {
  attributeData: AttributeData[];
};

export const ConditionBuilder = ({ attributeData }: Props) => {
  const form = useForm<CFConditionAttributes>({
    defaultValues: {
      conditionAttributes: [{ attribute: "", type: "seq", range: { start: 0, end: 2 } }],
    },
  });

  const { control } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "conditionAttributes",
  });

  const addCondition = () => {
    append({ attribute: "", type: "seq", range: { start: 0, end: 2 } });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {/* Left side: Conditions */}
      <Stack direction="row" spacing={2}>
        {fields.map((field, index) => (
          <ConditionCard key={field.id} index={index} attributeData={attributeData} form={form} />
        ))}
        <Button onClick={addCondition} variant="outlined" size="small">
          <Add />
        </Button>
      </Stack>

      {/* Arrow */}
      <ArrowRight fontSize={"large"} color={"success"} />

      {/* Right side: Target */}
      <CFTargetCard />
    </Stack>
  );
};
