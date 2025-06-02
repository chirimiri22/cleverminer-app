export const loadMockDataset = async () => {
  const response = await fetch('/data/people_dataset.csv');
  const blob = await response.blob();

  return new File([blob], "dataset.csv", { type: "text/csv" });
};
