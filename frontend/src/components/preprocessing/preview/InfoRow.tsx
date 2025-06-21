import { Stack, Typography } from "@mui/material";
import { Subtitle } from "../../common/Subtitle";
import React from "react";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";

type Props = {
  label: string;
  value: string;
};
export const InfoRow = ({ label, value }: Props) => {
  return (
    <Stack direction="row" gap={2} alignItems={"center"}>
      <Subtitle title={label} />
      <BootstrapTooltip title={value} placement="top">
        <Typography
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%", // Or a fixed width like '200px' if needed
          }}
        >
          {value}
        </Typography>
      </BootstrapTooltip>
    </Stack>
  );
};
