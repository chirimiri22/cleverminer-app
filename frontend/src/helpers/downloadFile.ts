export const downloadFile = (file: File, fileName: string = "clm_dataset.txt"): void => {
  const url = URL.createObjectURL(file);
  window.open(url);
  // Note: You can revoke the URL later if needed to free memory
  // URL.revokeObjectURL(url);
};
