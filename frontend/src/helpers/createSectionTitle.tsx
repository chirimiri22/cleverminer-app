import { Stack, Typography } from "@mui/material";
import { Colors } from "../styles/colors";
import { Step } from "../model/Step";

export const createSectionTitle = (step: Step) => {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: 1, }}>
      {/*<Typography variant={"caption"} sx={{ color: Colors.textSecondary }}>*/}
      {/*  {step.order}{" "}*/}
      {/*</Typography>*/}
      {step.icon}
      <Typography variant="h6">{step.name}</Typography>
    </Stack>
  );
};
