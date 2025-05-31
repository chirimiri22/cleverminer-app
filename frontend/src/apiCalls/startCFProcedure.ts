import { CFProcedure } from "../model/cf/condition/CFProcedure";
import { CFResults } from "../model/cf/result/CFResults";

export const startCFProcedure = async (procedure: CFProcedure, file: File): Promise<CFResults> => {
  const formData = new FormData();
  console.log("seding this", procedure);

  // Append JSON procedure as a string field
  formData.append("data", JSON.stringify(procedure));

  // Append file
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/api/cf-process", {
    method: "POST",
    body: formData,
  });


  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: CFResults = await response.json();
  return data;
};
