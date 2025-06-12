import { CategorizationFormData } from "../components/preprocessing/OrdinalPreprocessing";
import { NewCategory } from "../components/preprocessing/NominalPreprocessing";

export const createCustomNominalCategories = async (rows: NewCategory[], column: string, file: File) => {
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

  const response = await fetch("http://localhost:8000/api/replace_categories", {
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
