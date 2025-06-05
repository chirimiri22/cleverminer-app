import { UNIQUENESS_THRESHOLD } from "../constants/constants";

export const isAboveUniquenessThreshold = (catCount: number, recordsCount: number): boolean =>
  catCount > UNIQUENESS_THRESHOLD * recordsCount;
