import { ErrorOutline, FindReplace } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { SelectInput, SelectOption } from "../../common/input/SelectInput";
import { Subtitle } from "../../common/Subtitle";
import { useForm } from "react-hook-form";
import { replaceEmptyValues } from "../../../apiCalls/replaceEmptyValues";
import { useAppContext } from "../../../context/AppContext";
import { getProcessedAttribute } from "../../../apiCalls/getProcessedAttribute";
import { apiCallWrapper } from "../../../apiCalls/apiCallWrapper";
import React, { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";

type Props = {
  column: string;
};

enum ReplaceMode {
  None = "Empty Value (string)",
  Zero = "Zero (numeric)",
  False = "False (boolean)",
}

export type ReplaceEmptyFormData = {
  replaceMode: ReplaceMode;
  column: string;
};
export const ReplaceEmptyValues = (props: Props) => {
  const { datafile, setDatafile, updateProcessedAttributeData } = useAppContext();
  const [error, setError] = useState<string>();
  const form = useForm<ReplaceEmptyFormData>({
    defaultValues: {
      column: props.column,
    },
  });

  const options: SelectOption[] = Object.values(ReplaceMode).map((option) => ({
    label: option,
    value: option,
    hidden: false,
  }));
  return (
    <Stack textAlign={"start"} gap={1} pt={2}>
      <Typography variant={"caption"} textAlign={"center"}>
        {
          "This attribute contains null values, it might be useful to replace them even though CleverMiner can handle them"
        }
      </Typography>
      <SelectInput required form={form} name={"replaceMode"} label={"Replace Empty With"} options={options} />

      <Button
        variant="contained"
        size={"small"}
        sx={{ mt: 1 }}
        startIcon={<FindReplace />}
        disabled={!form.formState.isValid}
        onClick={async () => {
          const oldDataFile = datafile;
          if (!oldDataFile) return;
          const newFile = await apiCallWrapper(() => replaceEmptyValues(form.getValues(), datafile), setError);
          if (!newFile) return;
          const attribute = await apiCallWrapper(
            () => getProcessedAttribute(form.getValues("column"), newFile, true),
            setError
          );
          if (!attribute) return;
          setDatafile(newFile);
          updateProcessedAttributeData(form.getValues("column"), attribute);
          form.reset();
        }}
      >
        {"Replace"}
      </Button>
      {error && <ErrorMessage error={error} />}
    </Stack>
  );
};
