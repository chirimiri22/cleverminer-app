import React, {useState} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
    Collapse,
    Box,
    Divider
} from '@mui/material';
import {ExpandMore, ExpandLess, Search, ListAlt} from '@mui/icons-material';

type Props = {
    title: string;
    count: number;
    items: string[];
    showList: boolean;
};

export const AttributeCard = ({title, count, items, showList}: Props) => {
    const [expanded, setExpanded] = useState<boolean>(true);

    const toggleExpand = (): void => setExpanded(prev => !prev);

    return (
        <Card variant="outlined" sx={{width: 200, borderRadius: 2}}>
            <CardHeader
                title={
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant="subtitle1">{title}</Typography>
                        <Typography variant="caption">{count} categories</Typography>
                    </Box>
                }
                action={
                    <IconButton onClick={toggleExpand}>
                        {expanded ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{pt: 0}}>
                    <Divider sx={{mb: 1}}/>
                    {showList ? (
                        <>
                            {items.map((item: string, index: number) => (
                                <Typography key={index} variant="body2">{item}</Typography>
                            ))}
                            <Box sx={{textAlign: 'right'}}>
                                <IconButton size="small">
                                    <Search fontSize="small"/>
                                </IconButton>
                            </Box>
                        </>
                    ) : (
                        <Box
                            sx={{
                                height: 80,
                                backgroundColor: '#eee',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            Chart Placeholder
                            <IconButton
                                size="small"
                                sx={{position: 'absolute', top: 4, right: 4}}
                            >
                                <ListAlt fontSize="small"/>
                            </IconButton>
                        </Box>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
};


