"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { BeatLoader } from "react-spinners";
import { APP_COLORS } from "@/theme/colors";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  minHeight: 450,
}));

const LoadingIndicatorComponent = () => {
  return (
    <StyledGridContainer
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <BeatLoader color={APP_COLORS.PRIMARY_COLOR} />
      </Grid>
    </StyledGridContainer>
  );
};

export default LoadingIndicatorComponent;
