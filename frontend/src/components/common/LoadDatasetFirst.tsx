import { Button, Stack } from "@mui/material";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import {Colors} from "../../styles/colors";

export const LoadDatasetFirst = () => {
  const navigate = useNavigate();
  return (
    <Stack flexGrow={1} alignItems={"center"} gap={1}  >
      <Button variant={"contained"} onClick={() => navigate(ROUTES.DATASET)}>
        Load Dataset First
      </Button>
    </Stack>
  );
};
