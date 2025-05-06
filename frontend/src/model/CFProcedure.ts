import {QuantifierValue} from "./QuantifierValue";
import {IntervalRange} from "./IntervalRange";

export type CFProcedure = {
    range: IntervalRange,
    conjunction: boolean,
    quantifiers: QuantifierValue[],
//     other data
};
