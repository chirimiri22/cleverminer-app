// import { ResultAtrribute } from "../model/dataset/DatasetProcessed";
import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { Colors } from "../styles/colors";
import { ResultAttribute } from "../model/cf/result/CFResults";
import { CardBody } from "react-bootstrap";

type Props = {
  attribute: ResultAttribute;
};
export const ResultRuleAttribute = ({ attribute }: Props) => {
  return (
    <Card
      variant="outlined"

      sx={{
        borderRadius: 2,
        height: "fit-content",
        p: 2,
        display: "flex",
        width: "-webkit-fill-available",
      }}
    >
      <Stack width={"100%"} >
        <CardHeader sx={{ flexGrow: 1, p: 0 }} title={attribute.title} />
        <CardBody>
          <Typography color={Colors.textSecondary} variant={"subtitle2"}>
            {attribute.selectedCategories.join(", ")}
          </Typography>
        </CardBody>
      </Stack>
    </Card>
  );
};
