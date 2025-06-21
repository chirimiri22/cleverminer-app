import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { CFResults } from "../model/cf/results/CFResults";
import { BE_URL } from "../constants/constants";
import axios from "axios";

export const startCFProcedure = async (procedure: CFProcedure, file: File): Promise<CFResults> => {
  const formData = new FormData();

  procedure["quantifiers"] = procedure.quantifiers.filter((q) => q.value !== undefined && q.quantifier !== undefined);
  // Append JSON procedure as a string field

  formData.append("data", JSON.stringify(procedure));

  // Append file
  formData.append("file", file);

  const response = await axios.post(`${BE_URL}/cf-process`, formData);

  return response.data;
};
