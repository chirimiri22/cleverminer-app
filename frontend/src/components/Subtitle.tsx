import { SxProps, Typography } from "@mui/material";

type Props = {
  title: string;
  sx?: SxProps
};

export const Subtitle = ({ title, sx }: Props) => {
  return (
    <Typography variant="subtitle1" fontWeight={"bold"} sx={sx}>
      {title}
    </Typography>
  );
};
