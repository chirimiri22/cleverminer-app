import { ArrowCircleRight, Settings } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CFRule } from "../model/DatasetProcessed";
import { Colors } from "../styles/colors";
import { Histogram } from "./Histogram";
import { ResultRuleAttributes } from "./ResultRuleAttributes";
import { SectionBox } from "./SectionBox";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { useState } from "react";
import { BooleanInput } from "./Input/BooleanInput";
import { CFQuantifierDisplay } from "./CFResultSection";

//  todo: put to Colors.ts
export const CFQuantifierColors: Record<CFQuantifier, string> = {
  [CFQuantifier.Base]: "#1976d2", // blue
  [CFQuantifier.RelBase]: "#42a5f5", // light blue
  [CFQuantifier.S_Up]: "#388e3c", // green
  [CFQuantifier.S_Down]: "#d32f2f", // red
  [CFQuantifier.S_Any_Up]: "#66bb6a", // light green
  [CFQuantifier.S_Any_Down]: "#ef5350", // light red
  [CFQuantifier.Max]: "#fbc02d", // yellow
  [CFQuantifier.Min]: "#ffb300", // amber
  [CFQuantifier.RelMax]: "#9e9d24", // olive
  [CFQuantifier.RelMin]: "#f57f17", // dark amber
  [CFQuantifier.RelMax_leq]: "#8e24aa", // purple
  [CFQuantifier.RelMin_leq]: "#ce93d8", // light purple
};

type Props = {
  ruleIndex: number;
  rule: CFRule;
  displayQuantifiers: CFQuantifierDisplay;
};

export const QuantifierChips = (props: Props) => {
  return (
    <Stack direction={"row"} gap={1} mt={1} justifyContent={"flex-start"} flexGrow={1} flexWrap={"wrap"} width={"100%"}>
      <Chip label={`ID: ${props.ruleIndex}`} size="small" color={"primary"} />
      {Object.entries(props.displayQuantifiers).map(([key, value]) => {
        if (!value || key === "id") return null;
        return (
          <Chip
            key={key}
            label={`${key}: ${props.rule.quantifiers[key as keyof typeof CFQuantifier]}`}
            variant="outlined"
            size="small"
            sx={{ borderColor: CFQuantifierColors[key as keyof typeof CFQuantifier] }}
          />
        );
      })}
    </Stack>
  );
};
