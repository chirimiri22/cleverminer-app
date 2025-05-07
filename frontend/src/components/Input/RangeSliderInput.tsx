import { useState } from "react";
import { Slider, Stack, SxProps, Typography } from "@mui/material";
import { FormProps } from "../../model/FormProps";
import { FieldValues, PathValue } from "react-hook-form";
import { IntervalRange } from "../../model/IntervalRange";

type Props<TFormValues extends FieldValues> = FormProps<TFormValues, IntervalRange> & {
  max: number;
  onChange?: () => void;
  sx?: SxProps;
};

export const RangeSliderInput = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  max,
  onChange,
}: Props<TFormValues>) => {
  const [value, setValue] = useState<[number, number]>([0, max]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    console.log("newValue", newValue);

    // todo: this very dangerous freestyle
    if (Array.isArray(newValue)) {
      setValue(newValue as [number, number]);
      onChange?.();

      form.setValue(name, {
        start: newValue[0],
        end: newValue[1],
      } as PathValue<TFormValues, typeof name>);
    }
  };

  return (
    <Stack width={"90%"}>
      <Typography id="input-slider" fontSize={"small"} color={"textSecondary"} gutterBottom pl={0.5}>
        Range
      </Typography>
      <Slider
        disableSwap
        min={0}
        max={max}
        step={1}
        marks={Array.from({ length: max + 1 }, (_, i) => ({
          value: i,
          label: i,
        }))}
        value={value}
        onChange={handleChange}
      />
    </Stack>
  );
};
