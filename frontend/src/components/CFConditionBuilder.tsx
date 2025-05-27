import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Stack, Button, IconButton, Alert, Typography } from "@mui/material";
import { CFTargetCard } from "./Card/CFTargetCard";
import { ConditionCard } from "./Card/ConditionCard";
import { Add, ArrowCircleRight, ArrowDownward, ArrowRight } from "@mui/icons-material";
import { AttributeData } from "../model/AttributeData";
import { CFConditionAttributes } from "../model/CFConditionAttributes";
import { TypeOptions } from "../constants/enums/TypeOptions";
import { Colors } from "../styles/colors";


type Props = {
  attributeData: AttributeData[];
  conjunction: boolean;
  horizontal?: boolean;
};

const getFirstUnusedAttribute = (attributeData: AttributeData[], usedAttributes: string[]) => {
  return attributeData.find((x) => !usedAttributes.includes(x.title));
};

export const ConditionBuilder = ({ attributeData, conjunction, horizontal }: Props) => {
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditionAttributes",
  });

  // const [horizontal, setHorizontal] = useState(true);

  const conditionAttributes = form.watch("conditionAttributes").map((x) => x.attribute);
  const targetAttribute = form.watch("targetAttribute");
  const usedAttributes = targetAttribute ? [...conditionAttributes, targetAttribute] : conditionAttributes;

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

  const removeCondition = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  return (
    <Stack direction={horizontal ? "row" : "column"} gap={4} mt={1} alignItems="center">
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        flexWrap={!horizontal ? "wrap" : undefined}
        justifyContent={horizontal ? "flex-start" : "center"}
      >
        {/* todo: key prop*/}
        {fields.map((field, index) => (
          <Stack direction={"row"} gap={1} alignItems={"center"} key={field.id}>
            <ConditionCard
              index={index}
              attributeData={attributeData}
              form={form}
              attributeOptions={unusedAttributeOptions}
              onRemove={removeCondition}
            />
            {fields.length - 1 > index && (
              <Typography fontSize={"small"} color={Colors.textSecondary}>
                {conjunction ? "AND" : "OR"}
              </Typography>
            )}
          </Stack>
        ))}
        {usedAttributes.length < attributeData.length && (
          <Stack alignItems={"center"}>
            <IconButton onClick={addCondition} size="large" sx={{ height: 50, width: 50 }}>
              <Add fontSize={"large"} />
            </IconButton>
          </Stack>
        )}
      </Stack>

      {/* Arrow */}
      <ArrowCircleRight
        sx={{
          height: 50,
          width: 50,
          transform: horizontal ? undefined : "rotate(90deg)",
        }}
        color={"success"}
      />

      {/* Right side: Target */}
      <CFTargetCard form={form} attributeOptions={unusedAttributeOptions} />
    </Stack>
  );
};
