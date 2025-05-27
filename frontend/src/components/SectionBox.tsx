import { Button, Paper, Stack, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Colors } from "../styles/colors";

type Props = {
  title: ReactNode;
  children?: ReactNode;
  leftSection?: ReactNode;
  minHeight?: number;
  rightUpperTools?: ReactNode;
};

export const SectionBox = ({ title, children, leftSection, minHeight, rightUpperTools }: Props) => {
  return (
    <Stack>
      <Typography variant="h6" fontWeight={"bold"} mb={1}>
        {title}
      </Typography>
      <Paper variant="outlined" sx={{ minHeight: minHeight }}>
        <Stack direction={"row"} flexGrow={1} height={"100%"} position={"relative"}>
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
          {rightUpperTools && (
            <Stack
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                m: 1,
                bgcolor: Colors.primary,
                borderRadius: 5,
                zIndex: 120,
              }}
            >
              {rightUpperTools}
            </Stack>
          )}

          <Stack
            p={4}
            sx={{
              overflow: "hidden",
              overflowX: "auto",
              width: "100%",
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
