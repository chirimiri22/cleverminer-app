import { createSectionTitle } from "../../../helpers/createSectionTitle";
import { PREPROCESS_STEPS } from "../../../constants/preprocessSteps";
import { Stack } from "@mui/material";
import { PreprocessAttributeCard } from "./PreprocessAttrbuteCard";
import { SectionBox } from "../../common/SectionBox";
import React from "react";
import { DatasetProcessed } from "../../../model/dataset/DatasetProcessed";

type Props = {
  datasetProcessedAll: DatasetProcessed;
};

export const PreprocessSection = ({ datasetProcessedAll }: Props) => {
  // todo: right upper close all / open all

  return (
    <SectionBox title={createSectionTitle(PREPROCESS_STEPS.preprocess)}>
      <Stack direction={"row"} sx={{ gap: 2, overflowX: "auto" }}>
        {datasetProcessedAll.data.map((attribute, index) => {
          return <PreprocessAttributeCard attribute={attribute} shouldBePreprocessed={!!attribute.hidden} />;
        })}
      </Stack>
    </SectionBox>
  );
};
