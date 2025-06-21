import { ArrowCircleLeft, WarningAmber } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { PREPROCESS_STEPS } from "../../../constants/preprocessSteps";
import { createSectionTitle } from "../../../helpers/createSectionTitle";
import { Histogram } from "../../common/charts/Histogram";
import { SectionBox } from "../../common/SectionBox";
import { Subtitle } from "../../common/Subtitle";
import { InfoRow } from "./InfoRow";
import { useAppContext } from "../../../context/AppContext";
import { formatSize } from "../../../helpers/formatSize";
import { formatDate } from "../../../helpers/formatDate";
import { Colors } from "../../../styles/colors";
import React, { useState } from "react";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { DatasetProcessed } from "../../../model/dataset/DatasetProcessed";

type Props = {
  datasetProcessed: DatasetProcessed;
  datasetProcessedAll: DatasetProcessed;
};

export const PreviewSection = ({ datasetProcessed, datasetProcessedAll }: Props) => {
  const [currentAttributeName, setCurrentAttributeName] = useState<AttributeData | undefined>();

  console.log(datasetProcessed);
  const hiddenAttributes = datasetProcessedAll.data.filter((d) => d.hidden).length;

  return (
    <SectionBox
      title={createSectionTitle(PREPROCESS_STEPS.preview)}
      leftSection={
        <Stack flexGrow={1} pt={2}>
          <InfoRow label="File" value={datasetProcessed.metadata.name} />
          <InfoRow label="Format" value={datasetProcessed.metadata.format} />
          <InfoRow label="Rows" value={`${datasetProcessed.metadata.rows}`} />
          <InfoRow label="Attributes" value={`${datasetProcessed.metadata.columns}`} />
          {hiddenAttributes > 0 && (
            <Stack direction={"row"} alignItems={"start"} gap={1}>
              <WarningAmber sx={{ fontSize: 24, verticalAlign: "middle", color: Colors.warning }} />
              <Typography variant={"caption"} color={"warning"}>
                {hiddenAttributes} hidden attributes - too many categories. Unhide or prep them in the next step.
              </Typography>
            </Stack>
          )}
          <InfoRow label="Memory" value={formatSize(datasetProcessed.metadata.size)} />
          <InfoRow label="Loaded" value={formatDate(datasetProcessed.metadata.date)} />
        </Stack>
      }
    >
      <Stack direction="row" sx={{ gap: 2 }}>
        <Stack width={"50%"} alignItems={"center"} gap={1}>
          <Subtitle title={"Uniqueness Histogram"} />
          <Histogram
            mode="complex"
            color={Colors.primary}
            categories={datasetProcessed.data.map((d) => ({ label: d.title, count: d.categories.length }))}
            onClick={(categoryName) =>
              setCurrentAttributeName(datasetProcessed.data.find((c) => c.title === categoryName))
            }
          />
        </Stack>
        <Stack width={"50%"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} gap={1}>
          {currentAttributeName ? (
            <>
              <Subtitle title={`Histogram of ${currentAttributeName?.title}`} />
              <Histogram mode="complex" categories={currentAttributeName.categories} />
            </>
          ) : (
            <>
              Click on a column of the histogram to the left.
              <ArrowCircleLeft />
            </>
          )}
        </Stack>
      </Stack>
    </SectionBox>
  );
};
