import { Button, Stack, Typography } from "@mui/material";
import { ObserveAtrributeCard } from "./Card/ObserveAtrributeCard";
import { SectionBox } from "./SectionBox";
import { createSectionTitle, FOUR_STEPS } from "../pages/ProcedureCFMiner";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

import { LoadDatasetFirst } from "./LoadDatasetFirst";

export const ObserveDataSection = () => {
  const { datasetProcessed } = useAppContext();

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
