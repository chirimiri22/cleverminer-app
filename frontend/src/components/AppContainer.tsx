import {Stack} from "@mui/material";

type Props = {
    children: React.ReactNode;
}
export const AppContainer = ({children}: Props) => {
    return <Stack>
        wrappig the content
        {children}
        yeeeeeah
    </Stack>

}
