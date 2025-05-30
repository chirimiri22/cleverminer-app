import React, { ReactNode, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Collapse,
  Tooltip,
  Box,
  Divider,
  Stack,
  SxProps,
} from "@mui/material";
import { ExpandMore, ExpandLess, Search, ListAlt } from "@mui/icons-material";
import { Colors } from "../../styles/colors";
import { BootstrapTooltip } from "../BootstrapTooltip";

type Props = {
  title: string;
  dot?: string;
  dotTip?: string;
  children?: ReactNode;
  actions?: ReactNode;
  disabled?: boolean;
};

// todo: think about the sctructure of the files

export const GeneralAttributeCard = ({ title, dot, dotTip, children, disabled }: Props) => {
  // todo: implement disabled prop
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = (): void => setExpanded((prev) => !prev);

  return (
    <Card variant="outlined" sx={{ minWidth: 200, width: 300, flexGrow: 0, borderRadius: 2, height: "fit-content" }}>
      <CardHeader
        title={
          <Stack direction={"row"} gap={1} sx={{ alignItems: "center" }}>
            {title}

            {/* todo: style tip maybe*/}
            <BootstrapTooltip title={dotTip}>
              <Stack
                sx={{
                  minWidth: 20,
                  px: dot && dot?.length > 1 ? 0.5 : 0,
                  height: 20,
                  borderRadius: 5,
                  backgroundColor: Colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color={"white"}>
                  {dot}
                </Typography>
              </Stack>
            </BootstrapTooltip>
          </Stack>
        }
        action={
          children && <IconButton onClick={toggleExpand}>{expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            py: 0,
            "&.MuiCardContent-root:last-child": {
              pb: 2,
            },
          }}
        >
          <Divider sx={{ mb: 1 }} />
          {children}
        </CardContent>
      </Collapse>
    </Card>
  );
};
