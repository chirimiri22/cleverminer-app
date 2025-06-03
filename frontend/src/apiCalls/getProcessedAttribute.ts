import { AttributeData } from "../model/dataset/AttributeData";

export const getProcessedAttribute = async (column: string, file: File): Promise<AttributeData> => {
  const formData = new FormData();
  formData.append("column", column);
  formData.append("file", file);

  const res = await fetch("http://localhost:8000/api/attribute-data", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let errMsg = `Request failed with status ${res.status}`;
    try {
      const errJson = await res.json();
      errMsg = errJson.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await res.json();
  console.log(data);
  return data as AttributeData;
};
