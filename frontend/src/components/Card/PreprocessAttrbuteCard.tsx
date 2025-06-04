import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { AttributeData } from "../../model/dataset/AttributeData";
import { BootstrapTooltip } from "../BootstrapTooltip";
import { GeneralAttributeCard, State } from "./GeneralAttributeCard";
import { useAppContext } from "../../context/AppContext";
import { Colors } from "../../styles/colors";
import { BooleanInput } from "../Input/BooleanInput";
import { NominalPreprocessing } from "../NominalPreprocessing";
import { OrdinalPreprocessing } from "../OrdinalPreprocessing";
import { Subtitle } from "../Subtitle";

type Props = {
  attribute: AttributeData;
  shouldBePreprocessed: boolean;
};
type FormValues = {
  nominal: boolean;
};

export const PreprocessAttributeCard = ({ attribute, shouldBePreprocessed }: Props) => {
  const { changeHiddenState } = useAppContext();

  const form = useForm<FormValues>({
    defaultValues: {
      nominal: true,
    },
  });
  const isNominal = form.watch("nominal");

  const isHidden = attribute.hidden;

  const handleHideAttribute = (attributeName: string) => {
    changeHiddenState(attributeName);
  };

  const disabledOrdinal = !attribute.numeric && isNominal;

  return (
    <GeneralAttributeCard
      key={attribute.title}
      title={attribute.title}
      dot={`${attribute.categories.length}`}
      dotTip={"Categories count"}
      state={isHidden ? State.Hidden : shouldBePreprocessed ? State.Warning : State.Ok}
      stateTip={isHidden ? "Hidden" : shouldBePreprocessed ? "Large number of categories" : undefined}
    >
      <Stack textAlign={"center"} gap={1}>
        <Subtitle title={"Hide"} sx={{alignSelf: "start"}} />
        {shouldBePreprocessed && "Number of unique categories is large. Do you want to hide it?"}
        <BootstrapTooltip title={"Hide uncessary attribute. It will be hiddden in the whole app."}>
          <Button
            variant="outlined"
            size={"small"}
            startIcon={!isHidden ? <VisibilityOff /> : <Visibility />}
            onClick={() => handleHideAttribute(attribute.title)}
          >
            {isHidden ? "Show" : "Hide"}
          </Button>
        </BootstrapTooltip>
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
        <Stack alignItems={"center"}>
          <Subtitle title={"Preprocess"} sx={{alignSelf: "start"}} />
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
