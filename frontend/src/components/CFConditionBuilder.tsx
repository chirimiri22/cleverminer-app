import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Stack, Button, IconButton, Alert } from "@mui/material";
import { CFTargetCard } from "./Card/CFTargetCard";
import { ConditionCard } from "./Card/ConditionCard";
import { Add, ArrowRight } from "@mui/icons-material";
import { AttributeData } from "../model/AttributeData";
import { CFConditionAttributes } from "../model/CFConditionAttributes";
import { TypeOptions } from "../constants/enums/TypeOptions";

type Props = {
  attributeData: AttributeData[];
};

const getFirstUnusedAttribute = (attributeData: AttributeData[], usedAttributes: string[]) => {
  return attributeData.find((x) => !usedAttributes.includes(x.title));
};

export const ConditionBuilder = ({ attributeData }: Props) => {
  const form = useForm<CFConditionAttributes>({
    defaultValues: {
      conditionAttributes: [
        {
          attribute: attributeData[0].title,
          type: TypeOptions.Subset,
          range: {
            start: 0,
            end: attributeData[0].categories.length,
          },
        },
      ],
    },
  });

  const { control } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "conditionAttributes",
  });

  const usedAttributes = form.watch("conditionAttributes").map((x) => x.attribute);

  const targetAttributes = undefined;

  const unusedAttributeOptions = attributeData.map((x) => ({
    label: x.title,
    value: x.title,
    hidden: usedAttributes.includes(x.title),
  }));

  if (attributeData.length < 2) {
    return (
      <Alert severity="error">
        Not enough attributes available in dataset. You need at least 2 attributes for this procedure, but your dataset
        has {attributeData.length}.
      </Alert>
    );
  }

  const addCondition = () => {
    const nextUnusedAttribute = getFirstUnusedAttribute(attributeData, usedAttributes);
    nextUnusedAttribute &&
      append({
        attribute: nextUnusedAttribute.title,
        type: TypeOptions.Subset,
        range: {
          start: 0,
          end: nextUnusedAttribute.categories.length,
        },
      });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {/* Left side: Conditions */}
      <Stack direction="row" spacing={2} alignItems="center">
        {fields.map((field, index) => (
          <ConditionCard
            key={field.id}
            index={index}
            attributeData={attributeData}
            form={form}
            attributeOptions={unusedAttributeOptions}
          />
        ))}
        {usedAttributes.length < attributeData.length - 1 && (
          <IconButton onClick={addCondition} size="large" sx={{ height: 50, width: 50 }}>
            <Add fontSize={"large"} />
          </IconButton>
        )}
      </Stack>

      {/* Arrow */}
      <ArrowRight fontSize={"large"} color={"success"} />

      {/* Right side: Target */}
      <CFTargetCard />
    </Stack>
  );
};
