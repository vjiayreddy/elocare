"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./emotionCache";
import { lightTheme, globalStyles } from "./muiThemeConfig";
import GlobalStyles from "@mui/material/GlobalStyles";

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }:ThemeRegistryProps) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <>{children}</>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
