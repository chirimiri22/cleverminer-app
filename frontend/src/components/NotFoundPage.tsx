import React from "react";
import { Box, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
  );
};
