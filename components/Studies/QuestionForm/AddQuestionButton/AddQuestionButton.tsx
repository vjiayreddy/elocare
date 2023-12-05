import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledAddNewQuestionSection = styled(Box)(({ theme }) => ({
  width: "100%",
  border: `2px dashed ${theme.palette.grey[300]}`,
  padding: 20,
}));

interface AddQuestionButtonComponentProps {
  onClick: () => void;
}

const AddQuestionButtonComponent = ({
  onClick,
}: AddQuestionButtonComponentProps) => {
  return (
    <StyledAddNewQuestionSection onClick={onClick}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <img
            style={{ marginTop: 12 }}
            width="100%"
            src="/icons/plus-square.svg"
          />
        </Grid>
        <Grid item xs>
          <Typography mt={1} variant="body1">
            Add question
          </Typography>
          <Typography variant="body2">
            Select from Rating Scale, Multiple-Choice, Likert Scale, Open-Text,
            Yes/No, Checklist, etc.
          </Typography>
        </Grid>
      </Grid>
    </StyledAddNewQuestionSection>
  );
};

export default AddQuestionButtonComponent;
