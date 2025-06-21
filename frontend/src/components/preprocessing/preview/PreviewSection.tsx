import { ArrowCircleLeft } from "@mui/icons-material";
import { Stack } from "@mui/material";
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
import { useState } from "react";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { DatasetProcessed } from "../../../model/dataset/DatasetProcessed";

type Props = {
  datasetProcessed: DatasetProcessed;
};

export const PreviewSection = ({ datasetProcessed }: Props) => {
  const [currentAttributeName, setCurrentAttributeName] = useState<AttributeData | undefined>();

  return (
    <SectionBox
      title={createSectionTitle(PREPROCESS_STEPS.preview)}
      leftSection={
        <Stack  flexGrow={1} pt={2}>
          <InfoRow label="File" value={datasetProcessed.metadata.name} />
          <InfoRow label="Format" value={datasetProcessed.metadata.format} />
          <InfoRow label="Rows" value={`${datasetProcessed.metadata.rows} rows`} />
          <InfoRow label="Columns" value={`${datasetProcessed.metadata.columns} columns`} />
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
