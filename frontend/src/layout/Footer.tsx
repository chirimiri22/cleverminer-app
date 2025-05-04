import { Box, Link, Stack, Typography } from "@mui/material";
import { CLEVERMINER_DOCS_URL } from "../constants/constants";

export const Footer = () => {
  return (
    <Stack sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
      <Typography variant="body2" color="textSecondary">
        Running on <Link href={CLEVERMINER_DOCS_URL}>Python CleverMiner package</Link>.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Created in 2025.
      </Typography>
    </Stack>
  );
};
