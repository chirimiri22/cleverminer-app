import {
  ArrowCircleRight,
  AutoGraph,
  BarChart,
  Construction,
  Download,
  FilterAlt,
  PlayArrow,
  QueryStats,
  Settings,
} from "@mui/icons-material";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";

import { PageContainer } from "../layout/PageContainer";
import { PageHeading } from "../components/PageHeading";

import { ObserveAtrributeCard } from "../components/Card/ObserveAtrributeCard";
import { SectionBox } from "../components/SectionBox";
import { mockDataset, mockResults } from "../model/Dataset";

import { CFResultSection } from "../components/CFResultSection";
import { CFConditionSection } from "../components/CFConditionSection";
import { ReactNode } from "react";
import { createSectionTitle } from "./ProcedureCFMiner";
import { PageNames } from "../constants/pageNames";
import { Histogram } from "../components/Histogram";

// todo: add to constants
type Step = {
  name: string;
  icon: ReactNode;
};

export const PREPROCESS_STEPS: {
  preview: Step;
  preprocess: Step;
} = {
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
    <Stack direction="row" gap={1} justifyContent={"space-between"}>
      <Typography variant="body1" fontWeight="bold">
        {label}:
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
};

// Function to format bytes to human-readable size
const formatSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

// Function to format date to string
const formatDate = (date: Date) => {
  return date.toLocaleDateString("cs-CZ");
};

export const Dataset = () => {
  return (
    <PageContainer>
      {/* todo: creat container for loading dataset*/}
      {/* todo create constants for page names and icons not only menu items*/}
      <PageHeading title={PageNames.dataPreprocessing.name} icon={PageNames.dataPreprocessing.largeIcon} />
      <SectionBox
        title={createSectionTitle(PREPROCESS_STEPS.preview)}
        leftSection={
          <Stack direction="column" gap={1}>
            <InfoRow label="File name" value={mockDataset.metadata.name} />
            <InfoRow label="Format" value={mockDataset.metadata.format} />
            <InfoRow label="Rows" value={`${mockDataset.metadata.rows} rows`} />
            <InfoRow label="Columns" value={`${mockDataset.metadata.columns} columns`} />
            <InfoRow label="Memory" value={formatSize(mockDataset.metadata.size)} />
            <InfoRow label="Loaded" value={formatDate(mockDataset.metadata.date)} />
          </Stack>
        }
      >
        <Stack direction="row" sx={{ gap: 2 }}>
          <Stack width={"50%"}>
            Uniqueness histogram
            <Histogram
              mode="complex"
              categories={mockDataset.data.map((d) => ({ label: d.title, count: d.categories.length }))}
            />
          </Stack>
          <Stack>pie chart</Stack>
        </Stack>
      </SectionBox>

      <SectionBox title={createSectionTitle(PREPROCESS_STEPS.preprocess)}>
        <Stack direction={"row"} sx={{ gap: 2, overflowX: "auto" }}>
          {mockDataset.data.map((data, index) => (
            <ObserveAtrributeCard key={index} attributeData={data} />
          ))}
        </Stack>
      </SectionBox>
    </PageContainer>
  );
};
