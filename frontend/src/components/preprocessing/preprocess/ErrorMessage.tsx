import { ErrorOutline } from "@mui/icons-material";

import { Stack, Typography } from "@mui/material";

type Props = {
  error: string;
};

export const ErrorMessage = ({ error }: Props) => (
  <Stack direction={"row"} gap={1}>
    <ErrorOutline fontSize={"small"} color={"error"} />
    <Typography color="error" variant={"caption"}>
      {error}
    </Typography>
  </Stack>
);
