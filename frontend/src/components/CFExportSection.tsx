import { Download } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { createSectionTitle } from "../pages/ProcedureCFMiner";
import { SectionBox } from "./SectionBox";
import { FOUR_STEPS } from "../constants/fourSteps";
import { downloadTxtFile } from "../helpers/downloadTxtFile";
import { useAppContext } from "../context/AppContext";
import { downlaodZipClmImages } from "../helpers/downlaodZipClmImages";

export const CFExportSection = () => {
  const { CFResults } = useAppContext();

  const handleExportTxtLOgs = () => {
    // Implement the logic to export TXT log
    if (!CFResults) return;
    downloadTxtFile("CFMiner_Logs", CFResults.logs.summary.concat(CFResults.logs.rulelist));
  };

  const handleExportClmPngs = () => {
    // Implement the logic to export PNGs for each column
    if (!CFResults) return;
    downlaodZipClmImages(CFResults.rules.map((rule) => rule.imageBase64 || ""));
  };

  return (
    <SectionBox title={createSectionTitle(FOUR_STEPS.exporting)}>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Button
          variant="outlined"
          startIcon={<Download />}
          disabled={!CFResults?.rules || !CFResults?.rules[0].imageBase64}
          onClick={handleExportClmPngs}
        >
          Export Clm native PNGs
        </Button>
        <Button variant="outlined" startIcon={<Download />}>
          Export CSV
        </Button>
        <Button variant="outlined" startIcon={<Download />} onClick={handleExportTxtLOgs} disabled={!CFResults}>
          Export TXT log
        </Button>
        <Button variant="outlined" startIcon={<Download />}>
          All in ZIP
        </Button>
        <Stack>
          {/* todo: preview */}
          {/*{CFResults && (*/}
          {/*  <>*/}
          {/*    {CFResults.rules.map((rule, index) => (*/}
          {/*      <img src={`data:image/png;base64,${rule.imageBase64}`} alt={index.toString()} />*/}
          {/*    ))}*/}
          {/*  </>*/}
          {/*)}*/}
        </Stack>
      </Stack>
    </SectionBox>
  );
};
