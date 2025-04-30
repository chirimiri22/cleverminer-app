import {ReactNode} from "react";
import {Stack} from "@mui/material";

type Props = {
    children: ReactNode;
}

export const PageContainer = ({children}: Props) => {
    return <Stack flexGrow={1} pl={4} my={4} gap={2}>
        {children}

    </Stack>
}
