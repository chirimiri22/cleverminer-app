import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
  onRemove?: () => void;
  disabled?: boolean;
}
export const RemoveButton = ({ onRemove, disabled }: Props) => {
  return (
    <IconButton
      size={"small"}
      sx={{
        height: 20,
        width: 20,
      }}
      disabled={disabled}
      onClick={ onRemove}
    >
      <Close fontSize={"small"} />
    </IconButton>
  );
};
