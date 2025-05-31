import { CFConditionAttribute } from "./CFConditionAttribute";

export type CFCondition = {
  conditionAttributes: CFConditionAttribute[];
  targetAttribute: string;
};
