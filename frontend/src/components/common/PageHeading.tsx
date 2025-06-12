import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

type Props = {
  icon: ReactNode;
  title: string;
  action?: ReactNode;
};

export const PageHeading = (props: Props) => {
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        {props.icon} <Typography variant="h4"> {props.title}</Typography>
      </Stack>
      {props.action && props.action}
    </Stack>
  );
};
