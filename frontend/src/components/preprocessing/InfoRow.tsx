import { Stack, Typography } from "@mui/material";
import { Subtitle } from "../common/Subtitle";
import React from "react";

type Props ={
  label: string;
  value: string;
}
export const InfoRow = ({ label, value }: Props) => {
  return (
    <Stack direction="row" gap={1} justifyContent={"space-between"} alignItems={"center"}>
      <Subtitle title={label} />
      <Typography>{value}</Typography>
    </Stack>
  );
};
