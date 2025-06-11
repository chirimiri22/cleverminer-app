import { Container, Stack } from "@mui/material";
import { SidebarMenu } from "./SIdebarMenu";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};
export const AppContainer = ({ children }: Props) => {
  return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header />

      {/* Main content area with sidebar and page content */}
      <Stack direction="row" sx={{ flexGrow: 1 }}>
        <SidebarMenu />
        <Stack
          flexGrow={1}
          sx={{
            maxWidth: "100%",
            overflowX: "hidden",
          }}
        >
          {children}
        </Stack>
      </Stack>

      {/* Footer */}
      <Stack py={2} sx={{ bgcolor: "#f5f5f5" }}>
        <Footer />
      </Stack>
    </Container>
  );
};
