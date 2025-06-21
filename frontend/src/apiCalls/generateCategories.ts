import { CategorizationFormData } from "../components/preprocessing/preprocess/OrdinalPreprocessing";
import { BE_URL } from "../constants/constants";
import axios from "axios";

export const sendCategorizeRequest = async (data: CategorizationFormData, file: File): Promise<File> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify(data));

  const response = await axios.post(`${BE_URL}/generate_categories`, formData, {
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
