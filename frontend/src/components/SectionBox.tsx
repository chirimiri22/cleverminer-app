import { Paper, Stack, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Colors } from "../styles/colors";

type Props = {
  title: ReactNode;
  children?: ReactNode;
  leftSection?: ReactNode;
  minHeight?: number;
};

export const SectionBox = ({ title, children, leftSection, minHeight }: Props) => {
  return (
    <Stack>
      <Typography variant="h6" fontWeight={"bold"} mb={1}>
        {title}
      </Typography>
      <Paper variant="outlined" sx={{ minHeight: minHeight }}>
        <Stack direction={"row"} flexGrow={1} height={"100%"}>
          {leftSection && (
            <Stack
              sx={{
                padding: 2,
                borderBottomLeftRadius: 3,
                borderTopLeftRadius: 3,
                backgroundColor: Colors.background,
                minWidth: 200,
                maxWidth: 220,
              }}
            >
              {leftSection}
            </Stack>
          )}
          <Stack
            p={2}
            sx={{
              overflow: "hidden",
              overflowX: "auto",

            }}
          >
            {children}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
