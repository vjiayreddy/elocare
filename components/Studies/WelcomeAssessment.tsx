import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { APP_COLORS } from "@/theme/colors";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";

const StyledWelcomeAssessmentComponent = styled(Box)(({ theme }) => ({
  backgroundColor: APP_COLORS.PRIMARY_LITE,
  padding: 30,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 5,
  marginBottom:40
}));

const WelcomeAssessmentComponent = () => {
  return (
    <StyledWelcomeAssessmentComponent mt={2}>
      <Grid container spacing={6} alignItems="center">
        <Grid item>
            <img alt="assessment_page" src="/icons/assessment_icon.svg"/>
        </Grid>
        <Grid item xs>
          <Typography mb={2} variant="subtitle1">
            Welcome to the Assessment page!
          </Typography>
          <Divider />
          <Typography mt={2} variant="subtitle2">
            Use this screen to design and preview your study. Once you’re ready
            progress to the Audience tab to configure your patient delivery.
          </Typography>
        </Grid>
      </Grid>
    </StyledWelcomeAssessmentComponent>
  );
};

export default WelcomeAssessmentComponent;
