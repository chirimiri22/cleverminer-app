import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const BootstrapTooltip = styled(({ className,placement ="right", ...props }: TooltipProps) => (
    <Tooltip {...props} placement={placement} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));
