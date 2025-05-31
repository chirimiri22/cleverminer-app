// api/uploadCsv.ts
import axios from "axios";
import { DatasetProcessed } from "../model/dataset/DatasetProcessed";

export const uploadCsv = async (file: File): Promise<DatasetProcessed> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<DatasetProcessed>("http://localhost:8000/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};



