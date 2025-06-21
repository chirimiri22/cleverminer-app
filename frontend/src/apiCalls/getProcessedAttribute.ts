import { AttributeData } from "../model/dataset/AttributeData";
import { BE_URL } from "../constants/constants";
import axios from "axios";

export const getProcessedAttribute = async (column: string, file: File, hidden: boolean): Promise<AttributeData> => {
  const formData = new FormData();
  formData.append("hidden", JSON.stringify(hidden));
  formData.append("column", column);
  formData.append("file", file);

  const res = await axios.post(`${BE_URL}/attribute-data`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = res.data;

  return data as AttributeData;
};
