import {
  ArrowBack,
  ArrowCircleLeft,
  ArrowCircleRight,
  AutoGraph,
  BarChart,
  Check,
  Construction,
  Download,
  FilterAlt,
  PlayArrow,
  QueryStats,
  Settings,
  Upload,
} from "@mui/icons-material";
import { Box, Button, Paper, Typography, Stack, Divider, IconButton, LinearProgress } from "@mui/material";

import { PageContainer } from "../layout/PageContainer";
import { PageHeading } from "../components/PageHeading";

import { ObserveAtrributeCard } from "../components/Card/ObserveAtrributeCard";
import { SectionBox } from "../components/SectionBox";
import { mockDataset,  } from "../model/dataset/DatasetProcessed";

import { CFResultSection } from "../components/CFResultSection";
import { CFConditionSection } from "../components/CFConditionSection";
import React, { ReactNode, useState } from "react";
import { createSectionTitle } from "./ProcedureCFMiner";
import { PageNames } from "../constants/pageNames";
import { Histogram } from "../components/Histogram";
import { Category } from "../model/dataset/Category";
import { AttributeData } from "../model/dataset/AttributeData";
import { Subtitle } from "../components/Subtitle";
import { Colors } from "../styles/colors";
import { GeneralAttributeCard } from "../components/Card/GeneralAttributeCard";
import { LineChart } from "../components/LineChart";
import { CategorizationInput } from "../components/CategorizationInput";
import { OrdinalPreprocessing } from "../components/OrdinalPreprocessing";
import { BooleanInput } from "../components/Input/BooleanInput";
import { NominalPreprocessing } from "../components/NominalPreprocessing";
import { useForm } from "react-hook-form";
import { BootstrapTooltip } from "../components/BootstrapTooltip";
import { useAppContext } from "../context/AppContext";
import { FileDropzone } from "../components/Input/FileDropZone";

// todo: add to constants
type Step = {
  name: string;
  icon: ReactNode;
};

export const PREPROCESS_STEPS: {
  load: Step;
  preview: Step;
  preprocess: Step;
} = {
  load: {
    name: "Load",
    icon: <Upload />,
  },
  preview: {
    name: "Preview",
    icon: <QueryStats />,
  },
  preprocess: {
    name: "Preprocess",
    icon: <FilterAlt />,
  },
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack direction="row" gap={1} justifyContent={"space-between"} alignItems={"center"}>
      <Subtitle title={label} />
      <Typography>{value}</Typography>
    </Stack>
  );
};

// Function to format bytes to human-readable size
const formatSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

// Function to format date to string
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};
const isGreaterThanTenPercent = (x: number, y: number): boolean => x > 0.1 * y;

type FormValues = {
  nominal: boolean;
};

export const Dataset = () => {
  const [currentAttributeName, setCurrentAttributeName] = useState<AttributeData | undefined>();
  const { datasetProcessed } = useAppContext();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      nominal: true,
    },
  });

  const isNominal = form.watch("nominal");
  return (
    <PageContainer>
      {/* todo: creat container for loading dataset*/}
      {/* todo create constants for page names and icons not only menu items*/}
      <PageHeading
        title={PageNames.dataPreprocessing.name}
        icon={PageNames.dataPreprocessing.largeIcon}
        action={
          <BootstrapTooltip title={"Download current dataset"} placement={"left"}>
            <IconButton size={"large"}>
              <Download fontSize={"large"} />
            </IconButton>
          </BootstrapTooltip>
        }
      />
      <SectionBox title={createSectionTitle(PREPROCESS_STEPS.load)} loading={loading}>
        <FileDropzone onLoadingChange={(value) => setLoading(value)} />
      </SectionBox>

      {datasetProcessed && (
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
          {/* todo: indicator of readiness*/}
          <SectionBox title={createSectionTitle(PREPROCESS_STEPS.preprocess)}>
            <Stack direction={"row"} sx={{ gap: 2, overflowX: "auto" }}>
              {datasetProcessed.data.map((data, index) => {
                const shouldBePreprocessed = isGreaterThanTenPercent(data.categories.length, 100);
                return (
                  <GeneralAttributeCard
                    title={data.title}
                    dot={`${data.categories.length}`}
                    dotTip={"Categories count"}
                    ok={!shouldBePreprocessed}
                    warning={shouldBePreprocessed ? "Large number of categories" : undefined}
                  >
                    {shouldBePreprocessed && (
                      <Stack textAlign={"center"} gap={1}>
                        Number of unique categories is large...
                        <Button variant="outlined" size={"small"} startIcon={<Check />}>
                          It's ok
                        </Button>
                        <Stack position={"relative"} my={1}>
                          <Divider />
                          <Typography
                            fontSize={"small"}
                            color={Colors.textSecondary}
                            bgcolor={"white"}
                            position={"absolute"}
                            left={"50%"}
                            top={-9}
                            sx={{ transform: "translateX(-50%)" }}
                          >
                            OR
                          </Typography>
                        </Stack>
                        <Stack alignItems={"center"}>
                          <BooleanInput
                            name={"nominal"}
                            form={form}
                            label1={"Ordinal prep."}
                            label2={"Nominal prep."}
                            twoStates
                          />
                        </Stack>
                        {isNominal ? <NominalPreprocessing data={data} /> : <OrdinalPreprocessing data={data} />}
                      </Stack>
                    )}
                  </GeneralAttributeCard>
                );
              })}
            </Stack>
          </SectionBox>
        </>
      )}
    </PageContainer>
  );
};
