import { QuantifierValue } from "./QuantifierValue";
import { IntervalRange } from "./IntervalRange";
import { CFCondition } from "./CFCondition";

export type CFProcedure = {
  range: IntervalRange;
  conjunction: boolean;
  quantifiers: QuantifierValue[];
  condition: CFCondition;
  generateImages: boolean;
};
