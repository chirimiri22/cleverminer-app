import {
  ArrowCircleLeft,
  Download,
  FilterAlt,
  QueryStats,
  Upload,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";

import { PageContainer } from "../app-layout/PageContainer";
import { PageHeading } from "../common/PageHeading";
import { SectionBox } from "../common/SectionBox";
import React, { ReactNode, useState } from "react";
import { PageNames } from "../../constants/pageNames";
import { Histogram } from "../common/charts/Histogram";
import { AttributeData } from "../../model/dataset/AttributeData";
import { Subtitle } from "../common/Subtitle";
import { Colors } from "../../styles/colors";
import { BootstrapTooltip } from "../common/BootstrapTooltip";
import { useAppContext } from "../../context/AppContext";
import { FileDropzone } from "../common/input/FileDropZone";
import { downloadFile } from "../../helpers/downloadFile";
import { PreprocessAttributeCard } from "./PreprocessAttrbuteCard";
import { InfoRow } from "./InfoRow";
import { PREPROCESS_STEPS } from "../../constants/preprocessSteps";
import { formatSize } from "../../helpers/formatSize";
import { formatDate } from "../../helpers/formatDate";
import { createSectionTitle } from "../../helpers/createSectionTitle";

export const Dataset = () => {
  const [currentAttributeName, setCurrentAttributeName] = useState<AttributeData | undefined>();
  const { getDatasetProcessed, datafile } = useAppContext();
  const datasetProcessed = getDatasetProcessed();
  const datasetProcessedAll = getDatasetProcessed(true);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    datafile && downloadFile(datafile, datasetProcessed?.metadata.name);
  };

  return (
    <PageContainer>
      <PageHeading
        title={PageNames.dataPreprocessing.name}
        icon={PageNames.dataPreprocessing.largeIcon}
        action={
          <BootstrapTooltip title={"Download current dataset"} placement={"left"}>
            <IconButton size={"large"} onClick={handleDownload}>
              <Download fontSize={"large"} />
            </IconButton>
          </BootstrapTooltip>
        }
      />
      <SectionBox title={createSectionTitle(PREPROCESS_STEPS.load)} loading={loading}>
        <FileDropzone onLoadingChange={(value) => setLoading(value)} />
      </SectionBox>

      {datasetProcessed && datasetProcessedAll && (
        <>
          <SectionBox
            title={createSectionTitle(PREPROCESS_STEPS.preview)}
            leftSection={
              <Stack justifyContent={"center"} flexGrow={1}>
                <InfoRow label="File name" value={datasetProcessed.metadata.name} />
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
                <Subtitle title={"Uniqueness histogram"} />
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

          {/* todo: right upper close all / open all*/}
          <SectionBox title={createSectionTitle(PREPROCESS_STEPS.preprocess)}>
            <Stack direction={"row"} sx={{ gap: 2, overflowX: "auto" }}>
              {datasetProcessedAll.data.map((attribute, index) => {
                return <PreprocessAttributeCard attribute={attribute} shouldBePreprocessed={!!attribute.hidden} />;
              })}
            </Stack>
          </SectionBox>
        </>
      )}
    </PageContainer>
  );
};
