import { CFConditionSettings } from "./CFConditionSettings";
import { mockDataset } from "../model/Dataset";
import { ConditionBuilder } from "./CFConditionBuilder";
import { SectionBox } from "./SectionBox";
import { useState } from "react";
import { BootstrapTooltip } from "./BootstrapTooltip";
import { IconButton } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import { Colors } from "../styles/colors";

export const CFConditionSection = () => {
  const [horizontal, setHorizontal] = useState(true);
  return (
    <SectionBox
      title={"🛠️ Condition"}
      leftSection={<CFConditionSettings max={mockDataset.data.length - 1} />}
      minHeight={300}
      rightUpperTools={
        <BootstrapTooltip title={"Change view "}>
          <IconButton
            onClick={() => setHorizontal(!horizontal)}
            sx={{
              height: 30,
              width: 30,
            }}
          >
            <ArrowCircleRight
              sx={{
                transform: horizontal ? "rotate(90deg)" : undefined,
                color: Colors.white,
              }}
            />
          </IconButton>
        </BootstrapTooltip>
      }
    >
      <ConditionBuilder attributeData={mockDataset.data} conjunction={true} horizontal={horizontal} />
    </SectionBox>
  );
};
