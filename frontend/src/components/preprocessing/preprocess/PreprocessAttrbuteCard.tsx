import { FilterAlt, FindReplace, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
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
import { SyntheticEvent, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { TabWrapper } from "../../cf/observe/ObserveAttributeCard";

type Props = {
  attribute: AttributeData;
  shouldBePreprocessed: boolean;
};
type FormValues = {
  nominal: boolean;
  visible: boolean;
};

// enum TabIndex {
//   Visibility = "Visibility",
//   EmptyValues = "EmptyValues",
//   Preprocessing = "Preprocessing",
// }

enum TabIndex {
  Visibility,
  EmptyValues,
  Preprocessing,
}

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

  const [value, setValue] = useState<TabIndex>(TabIndex.Visibility);

  const handleChange = (event: SyntheticEvent, newValue: TabIndex) => {
    setValue(newValue);
  };

  const form = useForm<FormValues>({
    defaultValues: {
      nominal: !attribute.numeric, // if numeric, default to ordinal, otherwise nominal
      visible: !attribute.hidden, // if hidden, default to true
    },
  });
  const isNominal = form.watch("nominal");

  const isHidden = attribute.hidden;

  const [collapsed, setCollapsed] = useState(!shouldBePreprocessed && !attribute.containsNull);
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
      isHidden={isHidden}
      shouldBePreprocessed={shouldBePreprocessed}
      collapsed={collapsed}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ backgroundColor: Colors.background, borderRadius: 2, maxHeight: 70 }}
        centered
      >
        <BootstrapTooltip title={"Set Visibility"} placement={"top"}>
          <Tab icon={<Visibility fontSize={"small"} />} aria-label="phone" />
        </BootstrapTooltip>

        <BootstrapTooltip
          title={
            attribute.containsNull
              ? "Replace Empty Values"
              : "Replace Empty Values - this attribute doesn't contain any."
          }
          placement={"top"}
        >


          <Tab icon={<FindReplace fontSize={"small"} />} aria-label="favorite" disabled={!attribute.containsNull} />

        </BootstrapTooltip>

        <BootstrapTooltip title={"Categorize"} placement={"top"}>
          <Tab icon={<FilterAlt fontSize={"small"} />} aria-label="person" />
        </BootstrapTooltip>
      </Tabs>

      <TabWrapper active={value === TabIndex.Visibility}>
        <Stack pt={2} alignItems={"center"} textAlign={"center"}>
          <Typography variant={"caption"} textAlign={"center"}>
            Is this attribute useful for you? If not, hide it.
          </Typography>

          <BooleanInput
            name={"visible"}
            form={form}
            label1={"Hidden"}
            label2={"Visible"}
            onChange={() => {
              handleHideAttribute(attribute.title);
            }}
          />
        </Stack>
      </TabWrapper>

      <TabWrapper active={value === TabIndex.EmptyValues}>
        <ReplaceEmptyValues column={attribute.title} />
      </TabWrapper>

      <TabWrapper active={value === TabIndex.Preprocessing}>
        <Stack pt={2}>
          <Stack alignItems={"center"}>
            <Typography variant={"caption"} textAlign={"center"}>
              Preprocess your attribute to make it more useful for analysis.
            </Typography>
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
      </TabWrapper>
    </GeneralAttributeCard>
  );
};
