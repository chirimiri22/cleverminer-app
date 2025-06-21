import { GeneralAttributeCard } from "../../common/GeneralAttributeCard";
import { IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";

import { Histogram } from "../../common/charts/Histogram";
import { AttributeData } from "../../../model/dataset/AttributeData";
import { ReactNode, SyntheticEvent, useState } from "react";
import { Analytics, ViewList, Visibility } from "@mui/icons-material";
import { BootstrapTooltip } from "../../common/BootstrapTooltip";
import { Colors } from "../../../styles/colors";

// allows caching fo the loaded data
export const TabWrapper = ({ children, active }: { children: ReactNode; active: boolean }) => {
  return <Stack display={active ? "flex" : "none"} pt={2}>{children}</Stack>;
};

type TabProps = {
  attributeData: AttributeData;
  active: boolean;
};
const ListTab = ({ attributeData, active }: TabProps) => {
  return (
    <TabWrapper active={active}>
      {attributeData.categories.map((category, index) => (
        <Stack key={index} direction={"row"} alignItems={"center"} gap={1}>
          <Typography fontWeight={"bold"}>{category.label}</Typography>({category.count})
        </Stack>
      ))}
    </TabWrapper>
  );
};

const HistogramTab = ({ attributeData, active }: TabProps) => {
  return (
    <TabWrapper active={active}>
      <Histogram categories={attributeData.categories} mode={"simple"} datalabels />
    </TabWrapper>
  );
};

enum CardTabs {
  Histogram,
  List,
}

export const ObserveAttributeCard = ({ attributeData }: { attributeData: AttributeData }) => {
  const [currentTab, setCurrentTab] = useState<CardTabs>(CardTabs.Histogram);
  const handleChange = (event: SyntheticEvent, newValue: CardTabs) => {
    setCurrentTab(newValue);
  };

  return (
    <GeneralAttributeCard
      title={attributeData.title}
      dot={`${attributeData.categories.length}`}
      dotTip={"Categories count"}
    >
      <Stack
        position={"relative"}

        maxHeight={200}
        sx={{
          overflowY: "auto",
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChange}
          sx={{ backgroundColor: Colors.background, borderRadius: 2, maxHeight: 70 }}
          centered
        >
          <BootstrapTooltip title={"Histogram"} placement={"top"}>
            <Tab icon={<ViewList fontSize={"small"} />} aria-label="phone" />
          </BootstrapTooltip>
          <BootstrapTooltip title={"List of Categories"} placement={"top"}>
            <Tab icon={<Analytics fontSize={"small"} />} aria-label="phone" />
          </BootstrapTooltip>
        </Tabs>

        <HistogramTab attributeData={attributeData} active={currentTab === CardTabs.Histogram} />
        <ListTab attributeData={attributeData} active={currentTab === CardTabs.List} />
      </Stack>
    </GeneralAttributeCard>
  );
};
