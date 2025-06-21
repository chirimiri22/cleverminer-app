import { CategorizationFormData } from "../components/preprocessing/preprocess/OrdinalPreprocessing";
import { NewCategory } from "../components/preprocessing/preprocess/NominalPreprocessing";
import { BE_URL } from "../constants/constants";
import axios from "axios";

export const createCustomNominalCategories = async (rows: NewCategory[], column: string, file: File): Promise<File> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "data",
    JSON.stringify({
      column: column,
      rows: rows.map((row) => ({
        label: row.label,
        selectedOptions: row.selectedOptions.map((option) => option.label),
      })),
    })
  );

  const response = await axios.post(`${BE_URL}/replace_categories`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });
  // Create a File from the blob with the desired filename and type
  return new File([response.data], "categorized.csv", {
    type: "text/csv",
  });
};
