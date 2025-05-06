import {useForm, useFieldArray, UseFormReturn} from "react-hook-form";
import {CFQuantifier} from "../constants/enums/CFQuantifier";
import {Button, Stack} from "@mui/material";
import {CFProcedure} from "../model/CFProcedure";
import {QuantifierRow} from "./QuantifierRow";
import {QuantifierValue} from "../model/QuantifierValue";
import {SelectOption} from "./Input/SelectInput";

// todo: i dont like this at all
const getAvailableQ = (watchedQuantifiers: (CFQuantifier | undefined)[]): CFQuantifier[] => {
    const allQuantifiers = Object.values(CFQuantifier)

    return allQuantifiers.filter(item => !watchedQuantifiers.includes(item))

}

type Props = {
    form: UseFormReturn<CFProcedure>

}

export const CFQuantifiersSection = ({form}: Props) => {

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "quantifiers",

    });


    const watchedQuantifiers = form.watch("quantifiers").map(q => q.quantifier);
    const options: SelectOption[] = Object.values(CFQuantifier).map(q => ({
        label: q,
        value: q,
        hidden: watchedQuantifiers.includes(q)
    }));


    return (
        <Stack gap={2}>
            {fields.map((field, index) => {

                    return <QuantifierRow
                        key={field.id}
                        form={form}
                        index={index}
                        options={options}
                    />
                }
            )}
            <Button onClick={() => append({quantifier: undefined, value: undefined})}>
                Add Row
            </Button>
        </Stack>
    );
};






