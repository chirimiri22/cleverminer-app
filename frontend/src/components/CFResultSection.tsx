import { ArrowCircleRight, Settings } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { mockDataset, mockResults } from "../model/Dataset";
import { Colors } from "../styles/colors";
import { Histogram } from "./Histogram";
import { ResultRuleAttributes } from "./ResultRuleAttributes";
import { SectionBox } from "./SectionBox";
import { CFQuantifier } from "../constants/enums/CFQuantifier";
import { useState } from "react";
import { BooleanInput } from "./Input/BooleanInput";
import { QuantifierChips } from "./QuantifierChips";


export type CFQuantifierDisplay = {
  [K in keyof typeof CFQuantifier]: boolean;
};

export const CFResultSection = () => {
  const form = useForm<CFQuantifierDisplay>();

  const formValues = form.watch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "boolean-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SectionBox
      title={"📊 Results"}
      rightUpperTools={
        <>
          <IconButton size={"small"} onClick={handleClick}>
            <Settings fontSize={"small"} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={2} minWidth={200}>
              <Typography variant="subtitle1" fontWeight={"bold"}>
                Display Quantifiers
              </Typography>
              {Object.keys(CFQuantifier).map((key) => (
                <BooleanInput
                  key={key}
                  form={form}
                  name={key as keyof CFQuantifierDisplay}
                  label2={CFQuantifier[key as keyof typeof CFQuantifier]}
                />
              ))}
            </Box>
          </Popover>
        </>
      }
      leftSection={
        <Stack alignItems={"center"} justifyContent={"end"} flexGrow={1} gap={3} pb={5}>
          <Typography variant={"h5"}>{mockResults.targetAttribute}</Typography>
          <Histogram categories={mockDataset.data[0].categories} />
        </Stack>
      }
    >
      {/*  todo : align*/}
      <Stack direction={"row"} gap={2} mt={1}>
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
              <QuantifierChips displayQuantifiers={formValues} rule={rule} ruleIndex={ruleIndex +1} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SectionBox>
  );
};
