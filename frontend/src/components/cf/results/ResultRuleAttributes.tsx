// import { ResultAtrribute } from "../model/dataset/DatasetProcessed";
import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { ResultRuleAttribute } from "./ResultRuleAttribute";
import { ResultAttribute } from "../../../model/cf/results/CFResults";

type Props = {
  attributes: ResultAttribute[];
  conjunction: boolean;
};
export const ResultRuleAttributes = ({ attributes, conjunction }: Props) => {
  return (
    <Stack  justifyContent={"end"} flexGrow={1}  >
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
