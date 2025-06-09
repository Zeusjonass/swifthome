import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    iconColor: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    iconColor?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    iconColor: true;
  }
}

export const mainTheme = createTheme({
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#182434",
      dark: "#121b27",
      light: '#2E3A4D'
    },
    secondary: {
      main: "#F4F4F4",
    },
    tertiary: {
      main: "#F7F2ED",
      light: "#FAF7F5",
    },
    info: {
      main: "#E2F3F2",
    },
    iconColor: {
      main: '#08363d',
      contrastText: '#FFF4E8',
    },
  },
});
