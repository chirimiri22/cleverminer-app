import { SxProps, Typography } from "@mui/material";
import { Colors } from "../styles/colors";

type Props = {
  title: string;
  smaller?: boolean;
  sx?: SxProps;
};

export const Subtitle = ({ title, sx, smaller }: Props) => {
  return (
    <Typography
      variant={smaller ? "body2" : "subtitle1"}
      fontWeight={"bold"}
      sx={{ color: smaller ? Colors.textPrimary : Colors.black, ...sx }}
    >
      {title}
    </Typography>
  );
};
