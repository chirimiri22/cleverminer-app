import { Download } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Stack } from "@mui/material";
import { createSectionTitle } from "../helpers/createSectionTitle";
import { SectionBox } from "./SectionBox";
import { FOUR_STEPS } from "../constants/fourSteps";
import { downloadTxtFile } from "../helpers/downloadTxtFile";
import { useAppContext } from "../context/AppContext";
import { downlaodZipClmImages } from "../helpers/downlaodZipClmImages";

import { useRef } from "react";
import { Subtitle } from "./Subtitle";
import { GeneralAttributeCard } from "./Card/GeneralAttributeCard";

type Props = {
  downloadRenderedAsPNG: () => void;
};

export const CFExportSection = ({ downloadRenderedAsPNG }: Props) => {
  const { CFResults } = useAppContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const disabled = !CFResults || !CFResults.rules || CFResults.rules.length === 0;

  const handleExportTxtLOgs = () => {
    // Implement the logic to export TXT log
    if (disabled) return;
    downloadTxtFile("CFMiner_Logs", CFResults.logs.summary.concat(CFResults.logs.rulelist));
  };

  const handleExportClmPngs = () => {
    // Implement the logic to export PNGs for each column
    if (disabled) return;
    downlaodZipClmImages(CFResults.rules.map((rule) => rule.imageBase64 || ""));
  };

  const handleExportVisiblePngs = () => {
    if (disabled) return;
    downloadRenderedAsPNG();
  };

  return (
    <SectionBox title={createSectionTitle(FOUR_STEPS.exporting)}>
      <Stack gap={3}>
        <Stack ref={ref} direction={"row"} gap={1} alignItems={"center"} bgcolor={"white"}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            disabled={disabled || !CFResults?.rules[0].imageBase64}
            onClick={handleExportClmPngs}
          >
            Export Clm native PNGs
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExportVisiblePngs} disabled={!CFResults}>
            Export PNGs from visible
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExportTxtLOgs} disabled={!CFResults}>
            Export TXT log
          </Button>
        </Stack>
        {!disabled && CFResults?.rules[0].imageBase64 && (
          <Stack gap={1}>
            <Subtitle title={"Preview native CleverMiner images"} />
            {/* todo: preview */}

            <Stack
              direction={"row"}
              gap={2}
              sx={{ overflowX: "scroll" }}
              // flexWrap={"wrap"}
            >
              {CFResults.rules.map((rule, index) => (
                <Box position={"relative"} key={index}>
                  <img
                    src={`data:image/png;base64,${rule.imageBase64}`}
                    alt={index.toString()}
                    style={{ height: "250px", width: "auto" }}
                  />
                  <Chip
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    label={`Rule #${index + 1}`}
                    color={"primary"}
                    size={"small"}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </SectionBox>
  );
};
