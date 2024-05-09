import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "system-ui",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ].join(","),
  },
});

export default theme;
