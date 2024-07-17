import { IconButton, useTheme } from "@mui/material";
import { memo } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "@/providers/Theme";

const ToggleThemeButton = memo(function ToggleThemeButton() {
  const colorMode = useColorMode();
  const theme = useTheme();
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
});

export default ToggleThemeButton;
