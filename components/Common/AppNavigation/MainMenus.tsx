import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { mainMenus } from "@/utils/constants";

const MainMenusComponent = () => {
  return (
    <Fragment>
      <Grid container columnSpacing={1}>
        {mainMenus.map((menu) => (
          <Grid key={menu.label} item>
            <Button size="small" variant="text" color="inherit" href={menu?.url}>
              {menu.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default MainMenusComponent;
