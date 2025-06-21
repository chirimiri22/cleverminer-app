import { Container, Stack } from "@mui/material";
import { SidebarMenu } from "./SIdebarMenu";
import { Footer } from "./Footer";
import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { unstable_usePrompt } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

type Props = {
  children: ReactNode;
};
export const AppContainer = ({ children }: Props) => {
  const { datafile } = useAppContext();

  // prevent unloading of the page
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (datafile) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    console.log("run");

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [datafile]);

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
