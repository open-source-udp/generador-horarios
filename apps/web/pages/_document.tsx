import { Html, Head, Main, NextScript } from "next/document";
import { useTheme, Container } from "@mui/material";
import Header from "@/components/Header";

export default function Document() {
  const theme = useTheme();
  return (
    <Html lang="en">
      <Head />
      <body style={{ margin: 0, backgroundColor: "" }}>
        <Container
          sx={{ bgcolor: "background.default", minHeight: "100vh" }}
          maxWidth="xl"
        >
          <Header />
          <Main />
          <NextScript />
        </Container>
      </body>
    </Html>
  );
}
