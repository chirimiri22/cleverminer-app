import { CategorizationFormData } from "../components/preprocessing/preprocess/OrdinalPreprocessing";
import axios from "axios";
import { BE_URL } from "../constants/constants";

type CategoryRangeResponse = {
  category_ranges: [number, number][];
};

export const previewCategories = async (form: CategorizationFormData, file: File): Promise<CategoryRangeResponse> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(form));
  formData.append("file", file);

  const response = await axios.post<CategoryRangeResponse>(`${BE_URL}/preview_categories`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
