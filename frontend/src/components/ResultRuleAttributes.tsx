import { ResultAtrribute } from "../model/DatasetProcessed";
import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { Colors } from "../styles/colors";
import { ResultRuleAttribute } from "./ResultRuleAttribute";

type Props = {
  attributes: ResultAtrribute[];
  conjunction: boolean;
};
export const ResultRuleAttributes = ({ attributes, conjunction }: Props) => {
  return (
    <Stack width={"100%"} justifyContent={"end"} flexGrow={1}>
      {attributes.map((attribute, attributeIndex) => (
        <Stack key={attribute.title} alignItems={"center"}>
          <ResultRuleAttribute attribute={attribute} />

          {attributes.length - 1 > attributeIndex && (
            <Typography my={-1} fontSize={"small"} color={Colors.textSecondary} zIndex={10}>
              {conjunction ? "AND" : "OR"}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
};
