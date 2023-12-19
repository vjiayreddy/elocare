import {
  PaletteColorOptions,
  createTheme,
  PaletteOptions,
  css,
} from "@mui/material/styles";
import { Inter } from "next/font/google";
import { APP_COLORS } from "./colors";
import { APP_BAR_SIZE } from "@/utils/constants";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface CustomPalette {
    milkWhite?: PaletteColorOptions;
    google?: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface Theme extends CustomPalette {}
  interface ThemeOptions extends CustomPalette {}
}

// Override button props
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    milkWhite: true;
    google: true;
  }
}
export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;
export const DEFAULT_THEME: AllowedTheme = "dark";
const defaultTheme = createTheme({});
const { augmentColor } = defaultTheme.palette;
const createColor = (mainColor: any) =>
  augmentColor({
    color: {
      main: mainColor,
    },
  });
export const lightTheme = createTheme({
  palette: {
    primary: { main: APP_COLORS.PRIMARY_COLOR },
    secondary: { main: APP_COLORS.SECONDARY_COLOR },
    text: {
      secondary: APP_COLORS.TEXT_SECONDARY_COLOR,
    },
    mode: "light",
  },
  typography: {
    fontFamily: [inter.style.fontFamily].join(","),
    h2: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: "40px",
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
      lineHeight: "22px",
      fontWeight: 500,
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "18px",
    },
    subtitle1: {
      fontSize: 18, 
      fontWeight: 700,
      lineHeight: "24px",
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "28px",
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "inherit",
      },
      styleOverrides: {
        root: {
          height: APP_BAR_SIZE,
        },
        colorInherit: {
          borderBottom: `1px solid ${defaultTheme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: APP_BAR_SIZE,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        disableElevation: true,
        fullWidth: true,
        size: "medium",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedSecondary: {
          backgroundColor: defaultTheme.palette.common.white,
          border: `1px solid ${defaultTheme.palette.divider}`,
          color: defaultTheme.palette.text.primary,
        },
        containedInherit: {
          backgroundColor: defaultTheme.palette.common.white,
          border: `1px solid ${defaultTheme.palette.divider}`,
          color: defaultTheme.palette.text.primary,
        },
        textInherit: {
          color: defaultTheme.palette.text.primary,
          fontSize: 16,
          fontWeight: 600,
        },
        sizeMedium: {
          height: 55,
          fontSize: 18,
        },
        sizeSmall: {
          height: 41,
          fontSize: 16,
        },
      },
    },
      MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${defaultTheme?.palette?.divider}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },
  },

  // components: {
  //   MuiAppBar: {
  //     defaultProps: {
  //       elevation: 0,
  //       color: "inherit",
  //     },
  //     styleOverrides: {
  //       root:{
  //         height:APP_BAR_SIZE
  //       },
  //       colorInherit: {
  //         borderBottom: `1px solid ${defaultTheme.palette.divider}`,
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //       },
  //     },
  //   },
  //   MuiToolbar:{
  //     styleOverrides: {
  //       root:{
  //         height:APP_BAR_SIZE
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     defaultProps: {
  //       disableElevation: true,
  //       variant: "contained",
  //       size: "medium",
  //     },
  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //         fontSize: 16,
  //       },
  //       sizeMedium: {
  //         height: 56,
  //       },
  //       colorInherit: {},
  //     },
  //   },
  //   MuiInputBase: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: 18,
  //       },
  //       sizeSmall: {},
  //     },
  //   },
  //   MuiTextField: {
  //     defaultProps: {
  //       size: "medium",
  //     },
  //     styleOverrides: {
  //       root: {
  //         fontSize: 18,
  //       },
  //     },
  //   },
  //   MuiTabs: {
  //     styleOverrides: {
  //       root: {
  //         borderBottom: `1px solid ${defaultTheme?.palette?.divider}`,
  //       },
  //     },
  //   },
  //   MuiTab: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //         fontSize: 16,
  //         fontWeight: 600,
  //       },
  //     },
  //   },
  // },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #ffffff;
      color: #121212;
    }
    main {
      padding-top: ${0}px;
    }
  }

  [data-theme="dark"] {
    body {
      background-color: #121212;
      color: #fff;
    }
  }
`;
