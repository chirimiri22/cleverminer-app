// uploadCsv.ts
import axios from "axios";
import { DatasetProcessed } from "../model/dataset/DatasetProcessed";
import { BE_URL } from "../constants/constants";

export const uploadCsv = async (file: File): Promise<DatasetProcessed> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<DatasetProcessed>(`${BE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);

  return response.data;
};
