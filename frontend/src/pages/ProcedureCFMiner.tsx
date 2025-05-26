import { ArrowCircleRight, BarChart, Download, PlayArrow, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";

import { PageContainer } from "../layout/PageContainer";
import { PageHeading } from "../components/PageHeading";

import { ObserveAtrributeCard } from "../components/Card/ObserveAtrributeCard";
import { SectionBox } from "../components/SectionBox";
import { mockDataset, mockResults } from "../model/Dataset";

import { CFResultSection } from "../components/CFResultSection";
import { CFConditionSection } from "../components/CFConditionSection";

export const ProcedureCFMiner = () => {
  return (
    <PageContainer>
      <PageHeading title={"CF Miner"} icon={<BarChart fontSize={"large"} />} />
      {/* todo: use mui icons*/}
      <SectionBox title={"🔍 Observe"}>
        <Stack direction={"row"} sx={{ gap: 2, overflowX: "auto" }}>
          {mockDataset.data.map((data, index) => (
            <ObserveAtrributeCard key={index} attributeData={data} />
          ))}
        </Stack>
      </SectionBox>
      {/* Condition Section */}
      <CFConditionSection />
      <CFResultSection />
      {/* Export */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">📤 Export</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export PNGs
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export CSV
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export TXT log
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            All in ZIP
          </Button>
        </Box>
      </Paper>
      ;
    </PageContainer>
  );
};
