import React, { useEffect } from "react";
import { Autocomplete, TextField, FormControl, Checkbox } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { Colors } from "../../styles/colors";
import { FormProps } from "../../model/FormProps";

export type SelectOption = { label: string; value: string; hidden?: boolean };

type Props<TFormValues extends FieldValues> = FormProps<TFormValues, SelectOption[]> & {
  onBlur?: () => void;
  onChange?: () => void;
  options: SelectOption[];
  size?: "small" | "medium";
  label: string;
  placeholder?: string;
};

export const AutocompleteInput = <TFormValues extends FieldValues>({
  form,
  label,
  name,
  onBlur,
  onChange,
  options,
  size = "small",
  placeholder,
}: Props<TFormValues>) => {
  return (
    <Controller
      name={name}
      rules={{ required: true }}
      control={form.control}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple


          size={"small"}
          disableCloseOnSelect
          id={`${name}-autocomplete`}
          options={options.sort((a, b) => a.label.localeCompare(b.label))} // Filter out hidden options
          renderOption={(props, option: SelectOption) => (
            <li {...props} key={option.label} style={{ display: option.hidden ? "none" : "block" }}>
              {option.label}
            </li>
          )}
          getOptionLabel={(option: SelectOption) => option.label}
          value={field.value ?? []} // Default to empty array if undefined
          onChange={(_, newValue: SelectOption[]) => {
            field.onChange(newValue.length === 0 ? [] : newValue); // Convert empty array to undefined
            onChange?.();
          }}
          onBlur={() => {
            field.onBlur();
            onBlur?.();
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              error={!!fieldState.error}
              label={label}
              required={true}
              placeholder={placeholder}
              sx={{
                fontSize: size === "medium" ? "x-large" : undefined,
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
              }}
            />
          )}
          isOptionEqualToValue={(option: SelectOption, value: SelectOption) => option.value === value.value}
        />
      )}
    />
  );
};
