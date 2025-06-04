import { Button, Stack, Typography } from "@mui/material";
import { ObserveAtrributeCard } from "./Card/ObserveAtrributeCard";
import { SectionBox } from "./SectionBox";
import { createSectionTitle } from "../pages/ProcedureCFMiner";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

import { LoadDatasetFirst } from "./LoadDatasetFirst";
import { FOUR_STEPS } from "../constants/fourSteps";

export const ObserveDataSection = () => {
  const { getDatasetProcessed } = useAppContext();
  const datasetProcessed = getDatasetProcessed()

  if (!datasetProcessed || !datasetProcessed.data || datasetProcessed.data.length === 0) {
    return (
      <SectionBox title={createSectionTitle(FOUR_STEPS.observe)}>
        <LoadDatasetFirst />
      </SectionBox>
    );
  }

  return (
    <SectionBox title={createSectionTitle(FOUR_STEPS.observe)}>
      <Stack direction={"row"} sx={{ gap: 2, overflowX: "auto" }}>
        {datasetProcessed.data.map((data, index) => (
          <ObserveAtrributeCard key={index} attributeData={data} />
        ))}
      </Stack>
    </SectionBox>
  );
};
