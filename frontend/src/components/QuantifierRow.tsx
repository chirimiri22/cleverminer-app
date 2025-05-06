import {UseFormReturn} from "react-hook-form";
import {CFProcedure} from "../model/CFProcedure";
import {Stack} from "@mui/material";
import {SelectInput, SelectOption} from "./Input/SelectInput";
import {NumberInput} from "./Input/NumberInput";

type Props = {
    form: UseFormReturn<CFProcedure>;
    index: number;
    options: SelectOption[];
};

export const QuantifierRow = ({form, index, options}: Props) => {
    const fieldName = `quantifiers.${index}` as const;

    return (
        <Stack direction="row" sx={{gap: 2}}>
            <SelectInput
                label="Quantifier"
                form={form}
                name={`${fieldName}.quantifier`}
                options={options}
            />
            <NumberInput
                label="Value"
                form={form}
                name={`${fieldName}.value`}
                min={0}
                onBlur={() => console.log(form.getValues())}
            />
        </Stack>
    );
};
