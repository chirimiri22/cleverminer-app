import { useForm, useFieldArray, FormProvider, UseFormReturn } from "react-hook-form";
import { Stack, Button, IconButton, Alert, Typography } from "@mui/material";
import { CFTargetCard } from "./CFTargetCard";
import { ConditionCard } from "./ConditionCard";
import { Add, ArrowCircleRight, ArrowDownward, ArrowRight } from "@mui/icons-material";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { CFCondition } from "../../../model/cf/condition/CFCondition";
import { TypeOptions } from "../../../constants/enums/TypeOptions";
import { Colors } from "../../../styles/colors";
import { CFProcedure } from "../../../model/cf/condition/CFProcedure";

type Props = {
  form: UseFormReturn<CFProcedure>
  attributeData: AttributeData[];
  conjunction: boolean;
  horizontal?: boolean;
};

const getFirstUnusedAttribute = (attributeData: AttributeData[], usedAttributes: string[]) => {
  return attributeData.find((x) => !usedAttributes.includes(x.title));
};

export const ConditionBuilder = ({ attributeData, conjunction, horizontal, form }: Props) => {

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "condition.conditionAttributes",
  });

  // const [horizontal, setHorizontal] = useState(true);

  const conditionAttributes = form.watch("condition.conditionAttributes").map((x) => x.attribute);
  const targetAttribute = form.watch("condition.targetAttribute");
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
    <Stack direction={horizontal ? "row" : "column"} gap={4} alignItems="center">
      <Stack
        direction="row"
        columnGap={6}
        rowGap={2}
        alignItems="center"
        flexWrap={!horizontal ? "wrap" : undefined}
        justifyContent={horizontal ? "flex-start" : "center"}
        position={"relative"}
        px={horizontal ? 0 : 5}
        pr={horizontal ? 4 : 0}
        pl={0}
      >
        {fields.map((field, index) => (
          <Stack direction={"row"} alignItems={"center"} key={field.id} position={"relative"}>
            <ConditionCard
              index={index}
              attributeData={attributeData}
              form={form}
              attributeOptions={unusedAttributeOptions}
              onRemove={removeCondition}
            />
            {fields.length - 1 > index && (
              <Stack
                alignItems={"center"}
                position={"absolute"}
                top={"50%"}
                right={-38}
                width={"30px"}
                sx={{ transform: "translateY(-50%)" }}
              >
                <Typography fontSize={"small"} color={Colors.textSecondary}>
                  {conjunction ? "AND" : "OR"}
                </Typography>
              </Stack>
            )}

            {usedAttributes.length < attributeData.length && fields.length - 1 === index && (
              <Stack alignItems={"center"} position={"absolute"} right={-55}>
                <IconButton onClick={addCondition} size="large" sx={{ height: 50, width: 50 }}>
                  <Add fontSize={"large"} />
                </IconButton>
              </Stack>
            )}
          </Stack>
        ))}
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
      <Stack pr={horizontal ? 4 : 0}>
        <CFTargetCard form={form} attributeOptions={unusedAttributeOptions} />
      </Stack>
    </Stack>
  );
};
