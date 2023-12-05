"use client";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { StyledAppBarComponent } from "./styled";
import Box from "@mui/material/Box";
import MainMenusComponent from "./MainMenus";
import AutocompleteSearchBarComponent from "../AutocompleteSearchBar/AutocompleteSearchBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@mui/material";

const AppNavigationComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <StyledAppBarComponent position="fixed">
      <Container disableGutters maxWidth="lg">
        <Toolbar disableGutters>
          <Box component="div" className="__app_logo">
            <img src="/logos/elocare.svg" />
          </Box>
          <Box component="div" className="__app_menu">
            <MainMenusComponent />
          </Box>
          <Box component="div" className="__app_search_bar">
            <AutocompleteSearchBarComponent />
          </Box>
          <Box component="div" className="__app_user_actions">
            <Grid container alignItems="center">
              <Grid item>
                <IconButton>
                  <img alt="settings" src="/icons/settings.svg" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <img alt="notification" src="/icons/notification.svg" />
                </IconButton>
              </Grid>
              <Grid item ml={1}>
                {session?.user ? (
                  <IconButton
                    onClick={() => {
                      signOut().then(() => {
                        router.push(APP_ROUTES.LOGIN);
                      });
                    }}
                  >
                    <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
                  </IconButton>
                ) : (
                  <Button
                    onClick={() => {
                      signIn();
                    }}
                    size="small"
                  >
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBarComponent>
  );
};

export default AppNavigationComponent;
