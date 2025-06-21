import { Download } from "@mui/icons-material";
import { Box, Button, Paper, Typography, Stack, IconButton } from "@mui/material";

import { PageContainer } from "../app-layout/PageContainer";
import { PageHeading } from "../common/PageHeading";

import { ObserveAttributeCard } from "./observe/ObserveAttributeCard";
import { SectionBox } from "../common/SectionBox";

import { CFResultSection } from "./results/CFResultSection";
import { CFConditionSection } from "./condition/CFConditionSection";
import { ReactNode, useEffect, useRef } from "react";
import { PageNames } from "../../constants/pageNames";
import { BootstrapTooltip } from "../common/BootstrapTooltip";
import { useAppContext } from "../../context/AppContext";
import { ObserveDataSection } from "./observe/ObserveDataSection";
import { useForm } from "react-hook-form";
import { CFProcedure } from "../../model/cf/condition/CFProcedure";
import { CFQuantifier } from "../../constants/enums/CFQuantifier";
import { TypeOptions } from "../../constants/enums/TypeOptions";
import { Step } from "../../model/Step";
import { FOUR_STEPS } from "../../constants/fourSteps";
import { CFExportSection } from "./export/CFExportSection";
import { downloadChildrenAsPNGsZip } from "../../helpers/donwload";
import { Colors } from "../../styles/colors";

export const ProcedureCFMiner = () => {
  const { getDatasetProcessed, setCFProcedure, CFProcedure } = useAppContext();
  const datasetProcessed = getDatasetProcessed();
  const max = datasetProcessed ? datasetProcessed.data.length - 1 : 1;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<CFProcedure>({
    defaultValues: CFProcedure ?? {
      range: {
        start: 0,
        end: max,
      },
      conjunction: true,
      quantifiers: [
        {
          quantifier: CFQuantifier.Base,
          value: datasetProcessed ? Math.floor(datasetProcessed.metadata.rows * 0.8) : 5,
        },
      ],
      generateImages: false,

      condition: {
        conditionAttributes: [
          {
            attribute: datasetProcessed?.data[0].title,
            type: TypeOptions.Subset,
            range: {
              start: 0,
              end: datasetProcessed?.data[0].categories.length,
            },
          },
        ],
      },
    },
    mode: "onChange",
  });

  const watchedForm = form.watch();

  useEffect(() => {
    console.log("careful");
    setCFProcedure(watchedForm);
  }, [JSON.stringify(watchedForm)]);

  return (
    <PageContainer>
      <PageHeading title={PageNames.cfMiner.name} icon={PageNames.cfMiner.largeIcon} />

      <ObserveDataSection />

      <CFConditionSection form={form} />

      <CFResultSection conditionData={form.watch()} isFormValid={form.formState.isValid} ref={containerRef} />

      <CFExportSection
        downloadRenderedAsPNG={() => downloadChildrenAsPNGsZip(containerRef.current, null, "rules.zip")}
      />
    </PageContainer>
  );
};
