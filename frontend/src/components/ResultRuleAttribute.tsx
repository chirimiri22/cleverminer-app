import { ResultAtrribute } from "../model/Dataset";
import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { Colors } from "../styles/colors";

type Props = {
  attribute: ResultAtrribute;
};
export const ResultRuleAttribute = ({ attribute }: Props) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 200, width: "100%", borderRadius: 2, height: "fit-content" }}>
      <CardHeader
        sx={{ py: 1, flexGrow: 1 }}
        title={
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            {attribute.title}
            <Typography color={Colors.textSecondary} variant={"subtitle2"} textAlign={"center"}>
              {attribute.selectedCategories.join(", ")}
            </Typography>
          </Stack>
        }
      />
    </Card>
  );
};
