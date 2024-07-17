import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useState, useMemo, createContext, useContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  return context;
}

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
