import { Box, Button, Container, Divider, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StorageIcon from "@mui/icons-material/Storage";
import { Colors } from "../styles/colors";
import { ROUTES } from "../constants/routes";
import { menuGroups } from "../layout/SIdebarMenu";
import { CLEVERMINER_DOCS_URL } from "../constants/constants";
import { Footer } from "../layout/Footer";
import { Logo } from "../components/Logo";

const BigButton = ({ onClick, title, icon }: { onClick: () => void; title: string; icon: React.ReactNode }) => {
  return (
    //  todo maybe add logo her
    <Stack gap={1} alignItems="center">
      {title}
      <Button
        onClick={onClick}
        disableElevation={true}
        startIcon={icon}
        sx={{
          width: 200,
          height: 200,
          backgroundColor: Colors.background,
          color: Colors.black,
          "&:hover": {
            backgroundColor: Colors.border,
          },
          textTransform: "none",
          borderRadius: "8px",
          "& .MuiButton-startIcon": {
            "& svg": {
              width: 150,
              height: 150,
            },
          },
        }}
      />
      {/*  {children}*/}
      {/*</Button>*/}
    </Stack>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
        alignItems: "center",
        py: 4,
      }}
    >
      <Stack mt={12} alignItems={"center"} gap={8}>
        <Typography variant="h3">Welcome to CleverMiner App!</Typography>

        <Stack direction={"row"} gap={8}>
          {menuGroups
            .flatMap((group) => group.items)
            .filter((i) => i.name !== "Documentation")
            .map((item, index) => (
              <BigButton onClick={() => navigate(item.path)} title={item.name} icon={item.icon} />
            ))}
        </Stack>
        {/* todo: add explanation of the 4 steps*/}
        <Stack>Cleverminer walks you through 4 easy steps to discover rules in your data!</Stack>

      </Stack>
      <Footer noBg />
    </Container>
  );
};
