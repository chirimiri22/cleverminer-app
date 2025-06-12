import { CategorizationFormData } from "../components/preprocessing/OrdinalPreprocessing";
import axios from "axios";

type CategoryRangeResponse = {
  category_ranges: [number, number][];
}

export const previewCategories = async (
  form: CategorizationFormData,
  file: File,
): Promise<CategoryRangeResponse> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(form));
  formData.append("file", file);

  const response = await axios.post<CategoryRangeResponse>(
    "http://localhost:8000/api/preview_categories",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );


  return response.data;
};
