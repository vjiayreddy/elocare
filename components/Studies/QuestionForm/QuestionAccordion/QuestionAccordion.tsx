import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

interface QuestionAccordionProps {
  ariaControls: string;
  id: string;
  children: React.ReactNode;
  number?: string;
  title: string;
}

const StyledQuestionNumber = styled(Box)(({ theme }) => ({
  height: 40,
  width: 40,
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: 8,
}));

const QuestionAccordion = ({
  ariaControls,
  id,
  number,
  children,
  title,
}: QuestionAccordionProps) => {
  return (
    <Grid container item xs={12}>
      {number && (
        <Grid item >
          <StyledQuestionNumber>{number}</StyledQuestionNumber>
        </Grid>
      )}

      <Grid item xs>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={ariaControls}
            id={id}
          >
            <Box pl={2} pr={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Box mt={0.8}>
                    <img alt="icon" src="/icons/question.svg" />
                  </Box>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{title}</Typography>
                </Grid>
              </Grid>
            </Box>
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default QuestionAccordion;
