import { Box, Link, Stack, Typography } from "@mui/material";
import { CLEVERMINER_DOCS_URL } from "../constants/constants";
import { Colors } from "../styles/colors";
type Props = {
  noBg?: boolean;
}
export const Footer = ({noBg = false} : Props) => {
  return (
    <Stack sx={{ textAlign: "center", backgroundColor: noBg ? undefined : Colors.background}}>
      <Typography variant="body2" color="textSecondary">
        Running on <Link href={CLEVERMINER_DOCS_URL}>Python CleverMiner package</Link>.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Created in 2025.
      </Typography>
    </Stack>
  );
};
