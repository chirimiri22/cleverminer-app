import { FindReplace, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";
import { GeneralAttributeCard, State } from "../../common/GeneralAttributeCard";
import { useAppContext } from "../../../context/AppContext";
import { Colors } from "../../../styles/colors";
import { BooleanInput } from "../../common/input/BooleanInput";
import { NominalPreprocessing } from "./NominalPreprocessing";
import { OrdinalPreprocessing } from "./OrdinalPreprocessing";
import { Subtitle } from "../../common/Subtitle";
import { SelectInput } from "../../common/input/SelectInput";
import { ReplaceEmptyValues } from "./ReplaceEmptyValues";
import { useState } from "react";

type Props = {
  attribute: AttributeData;
  shouldBePreprocessed: boolean;
};
type FormValues = {
  nominal: boolean;
};

const OrDivider = () => {
  return (
    <Stack position={"relative"} my={2}>
      <Divider />
      <Typography
        fontSize={"small"}
        color={Colors.textSecondary}
        bgcolor={"white"}
        position={"absolute"}
        left={"50%"}
        top={-9}
        sx={{ transform: "translateX(-50%)" }}
      >
        OR
      </Typography>
    </Stack>
  );
};

export const PreprocessAttributeCard = ({ attribute, shouldBePreprocessed }: Props) => {
  const { changeHiddenState } = useAppContext();

  const form = useForm<FormValues>({
    defaultValues: {
      nominal: !attribute.numeric, // if numeric, default to ordinal, otherwise nominal
    },
  });
  const isNominal = form.watch("nominal");

  const isHidden = attribute.hidden;

  const [collapsed, setCollapsed] = useState(!shouldBePreprocessed && !attribute.containsNull);
  const handleHideAttribute = (attributeName: string) => {
    const newState = changeHiddenState(attributeName);
    setCollapsed(!!newState);
  };

  const disabledOrdinal = !attribute.numeric && isNominal;

  return (
    <GeneralAttributeCard
      key={attribute.title}
      title={attribute.title}
      dot={`${attribute.categories.length}`}
      dotTip={"Categories count"}
      isHidden={isHidden}
      shouldBePreprocessed={shouldBePreprocessed}
      collapsed={collapsed}
    >
      <Stack textAlign={"center"} gap={1}>
        {shouldBePreprocessed && (
          <Typography variant={"caption"} color={"error"}>
            {"Number of unique categories is large."}
          </Typography>
        )}
        <Subtitle title={"Hide"} sx={{ alignSelf: "start" }} />

        <BootstrapTooltip title={"Hide uncessary attribute, therefore it was hiddden."}>
          <Button
            variant="outlined"
            size={"small"}
            startIcon={!isHidden ? <VisibilityOff /> : <Visibility />}
            onClick={() => handleHideAttribute(attribute.title)}
          >
            {isHidden ? "Show" : "Hide"}
          </Button>
        </BootstrapTooltip>

        {attribute.containsNull && (
          <>
            <OrDivider />
            <ReplaceEmptyValues column={attribute.title} />
          </>
        )}
        <OrDivider />
        <Stack alignItems={"center"}>
          <Subtitle title={"Preprocess"} sx={{ alignSelf: "start" }} />
          {/*Do you want to preprocess this?*/}
          <BootstrapTooltip
            placement={"bottom"}
            title={disabledOrdinal && "This attribute is not numeric, so ordinal preprocessing is not available."}
          >
            <Stack>
              <BooleanInput
                name={"nominal"}
                form={form}
                label1={"Ordinal prep."}
                label2={"Nominal prep."}
                twoStates
                disabled={disabledOrdinal} // todo add explaining tooltip
              />
            </Stack>
          </BootstrapTooltip>
        </Stack>
        {isNominal ? <NominalPreprocessing data={attribute} /> : <OrdinalPreprocessing data={attribute} />}
      </Stack>
    </GeneralAttributeCard>
  );
};
