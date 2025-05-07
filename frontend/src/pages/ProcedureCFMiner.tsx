import { BarChart, Download, PlayArrow } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Typography, Stack } from "@mui/material";

import { PageContainer } from "../layout/PageContainer";
import { PageHeading } from "../components/PageHeading";

import { ObserveAtrributeCard } from "../components/Card/ObserveAtrributeCard";
import { SectionBox } from "../components/SectionBox";
import { mockDataset } from "../model/Dataset";

import { CFConditionSettings } from "../components/CFConditionSettings";
import { ConditionBuilder } from "../components/CFConditionBuilder";

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
        <ConditionBuilder attributeData={mockDataset.data} />
      </SectionBox>

      {/* Results */}
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">📊 Results</Typography>
          <Button variant="contained" startIcon={<PlayArrow />}>
            Run
          </Button>
        </Box>

        {/* Rule count and charts */}
        <Typography sx={{ mt: 2 }}>Rule count: 2</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid>
            {/* todo: item*/}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2">Income</Typography>
              <Box sx={{ height: 100, backgroundColor: "#eee" }}>Chart</Box>
            </Paper>
          </Grid>
          <Grid>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2">City</Typography>
              <Box sx={{ height: 100, backgroundColor: "#eee" }}>Chart</Box>
            </Paper>
          </Grid>
          <Grid>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2">Age</Typography>
              <Box sx={{ height: 100, backgroundColor: "#eee" }}>Chart</Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

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
    </PageContainer>
  );
};
