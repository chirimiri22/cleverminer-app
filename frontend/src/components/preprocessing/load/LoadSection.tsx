import { createSectionTitle } from "../../../helpers/createSectionTitle";
import { PREPROCESS_STEPS } from "../../../constants/preprocessSteps";
import { FileDropzone } from "../../common/input/FileDropZone";
import { SectionBox } from "../../common/SectionBox";
import React, { useState } from "react";

export const LoadSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  return (
    <SectionBox title={createSectionTitle(PREPROCESS_STEPS.load)} loading={loading} error={error}>
      <FileDropzone onLoadingChange={setLoading} setError={setError} />
    </SectionBox>
  );
};
