import { ArrowCircleLeft, Download } from "@mui/icons-material";
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
import { PreprocessAttributeCard } from "./preprocess/PreprocessAttrbuteCard";
import { InfoRow } from "./preview/InfoRow";
import { PREPROCESS_STEPS } from "../../constants/preprocessSteps";
import { formatSize } from "../../helpers/formatSize";
import { formatDate } from "../../helpers/formatDate";
import { createSectionTitle } from "../../helpers/createSectionTitle";
import { LoadSection } from "./load/LoadSection";
import { PreviewSection } from "./preview/PreviewSection";
import { PreprocessSection } from "./preprocess/PreprocessSection";

export const Dataset = () => {
  const { getDatasetProcessed, datafile } = useAppContext();
  const datasetProcessed = getDatasetProcessed();
  const datasetProcessedAll = getDatasetProcessed(true);

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

      <LoadSection />
      {datasetProcessed && <PreviewSection datasetProcessed={datasetProcessed} />}
      {datasetProcessedAll && <PreprocessSection datasetProcessedAll={datasetProcessedAll} />}
    </PageContainer>
  );
};
