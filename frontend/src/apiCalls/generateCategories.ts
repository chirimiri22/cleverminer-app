import { CategorizationFormData } from "../components/preprocessing/OrdinalPreprocessing";
import { BE_URL } from "../constants/constants";

export const sendCategorizeRequest = async (data: CategorizationFormData, file: File): Promise<File> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify(data));

  const response = await fetch(`${BE_URL}/api/generate_categories`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();

  // Create a File from the blob with the desired filename and type
  return new File([blob], "categorized.csv", {
    type: "text/csv",
  });
};
