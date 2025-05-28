import { Typography } from "@mui/material";

type Props = {
  title: string;
};

export const Subtitle = ({ title }: Props) => {
  return (
    <Typography variant="subtitle1" fontWeight={"bold"}>
      {title}
    </Typography>
  );
};
