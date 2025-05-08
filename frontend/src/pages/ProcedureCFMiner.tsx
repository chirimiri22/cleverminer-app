import { ArrowCircleRight, BarChart, Download, PlayArrow } from "@mui/icons-material";
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
} from "@mui/material";

import { PageContainer } from "../layout/PageContainer";
import { PageHeading } from "../components/PageHeading";

import { ObserveAtrributeCard } from "../components/Card/ObserveAtrributeCard";
import { SectionBox } from "../components/SectionBox";
import { mockDataset, mockResults } from "../model/Dataset";

import { CFConditionSettings } from "../components/CFConditionSettings";
import { ConditionBuilder } from "../components/CFConditionBuilder";
import { Histogram } from "../components/Histogram";
import { Colors } from "../styles/colors";
import { ResultRuleAttributes } from "../components/ResultRuleAttributes";

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
      <SectionBox
        title={"🛠️ Condition"}
        leftSection={<CFConditionSettings max={mockDataset.data.length - 1} />}
        minHeight={300}
      >
        <ConditionBuilder attributeData={mockDataset.data} conjunction={true} />
      </SectionBox>
      <SectionBox
        title={"📊 Results"}
        leftSection={
          <Stack alignItems={"center"} justifyContent={"end"} flexGrow={1} gap={3} pb={5}>
            <Typography variant={"h5"}>{mockResults.targetAttribute}</Typography>
            <Histogram categories={mockDataset.data[0].categories} />
          </Stack>
        }
      >
        <Stack direction={"row"} gap={2}>
          {mockResults.rules.map((rule, ruleIndex) => (
            <Stack key={ruleIndex} alignItems={"center"} flexGrow={1} maxWidth={250} justifyContent={"space-between"}>
              <ResultRuleAttributes attributes={rule.attributes} conjunction={mockResults.conjunction} />

              <Stack alignItems={"center"}>
                {/* Arrow */}
                <ArrowCircleRight
                  sx={{
                    py: 0.5,
                    height: 20,
                    width: 20,
                    transform: "rotate(90deg)",
                  }}
                  color={"success"}
                />
                <Card variant="outlined" sx={{ borderRadius: 2, borderColor: Colors.success, maxWidth: 250 }}>
                  <CardContent>
                    <Histogram categories={mockDataset.data[0].categories} color={Colors.textSecondary} />
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </SectionBox>
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
