import {GeneralAttributeCard} from "./GeneralAttributeCard";
import {IconButton, Stack, Typography} from "@mui/material";

import {Histogram} from "../Histogram";
import {AttributeData} from "../../model/AttributeData";
import {ReactNode, useState} from "react";
import {Analytics, ViewList} from "@mui/icons-material";
import {BootstrapTooltip} from "../BootstrapTooltip";


// allows caching fo the loaded data
const TabWrapper = ({children, active}: { children: ReactNode, active: boolean }) => {
    return <Stack display={active ? "flex" : "none"}>
        {children}
    </Stack>
}

type TabProps = {
    attributeData: AttributeData
    active: boolean
}
const ListTab = ({attributeData, active}: TabProps) => {
    return <TabWrapper active={active}>
        {attributeData.categories.map((category, index) => (
            <Stack key={index} direction={"row"} alignItems={"center"} gap={1}><Typography
                fontWeight={"bold"}>{category.label}</Typography>({category.count})</Stack>
        ))}
    </TabWrapper>
}

const HistogramTab = ({attributeData, active}: TabProps) => {
    return <TabWrapper active={active}> <Histogram attibuteData={attributeData} mode={"simple"}/>
    </TabWrapper>
}


enum CardTabs {
    Histogram = "Histogram",
    List = "List",
}

export const ObserveAtrributeCard = ({attributeData}: { attributeData: AttributeData }) => {
    const [currentTab, setCurrentTab] = useState<CardTabs>(CardTabs.List);

    return <GeneralAttributeCard title={attributeData.title} dot={`${attributeData.categories.length}`}
                                 dotTip={"Categories count"}>
        <Stack position={"relative"} pt={2} maxHeight={130} sx={{
            overflowY: "auto",
        }}>
            <Stack position={"absolute"} right={2} top={0}>
                <BootstrapTooltip title={"Click here to change the view of the data."}>
                    <IconButton sx={{
                        p: 0,
                        opacity: 0.2,
                        transition: 'opacity 0.2s ease-in-out',
                        '&:hover': {
                            opacity: 1,
                        },
                    }}
                                onClick={() => setCurrentTab(currentTab === CardTabs.Histogram ? CardTabs.List : CardTabs.Histogram)}>
                        {currentTab === CardTabs.Histogram ? <Analytics/> : <ViewList/>}
                    </IconButton>
                </BootstrapTooltip>
            </Stack>
            <HistogramTab attributeData={attributeData} active={currentTab === CardTabs.Histogram}/>
            <ListTab attributeData={attributeData} active={currentTab === CardTabs.List}/>


        </Stack>

    </GeneralAttributeCard>

}
