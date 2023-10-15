import { ThemeRegistry, SWRProvider } from "@/providers";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function RootLayout(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <html lang="en">
      <body style={{ overflowX: "hidden" }}>
        <SWRProvider>
          <ThemeRegistry options={{ key: "mui" }}>
            <Grid
              container
              columnSpacing={2}
              sx={{ minHeight: "100vh" }}
              alignContent={"center"}
              justifyContent={"center"}
            >
              {children}
            </Grid>
          </ThemeRegistry>
        </SWRProvider>
      </body>
    </html>
  );
}
