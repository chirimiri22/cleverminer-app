import { Stack, Typography, TextField } from "@mui/material";

export const CFTargetCard = () => {
  return (
    <Stack spacing={1.5} border={2} borderColor="green" borderRadius={2} p={2} minWidth={220}>
      <Typography variant="subtitle2">Target value</Typography>
      <Typography fontWeight="bold" color="orange">
        Attribute: Income
      </Typography>
      <TextField fullWidth />
    </Stack>
  );
};
