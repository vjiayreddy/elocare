"use client";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormLabel from "@mui/material/FormLabel";
import TextInputFieldComponent from "@/components/Common/FormFields/TextInputField";
import SelectInputFieldComponent from "@/components/Common/FormFields/SelectInputField";
import {
  defaultQuestionValues,
  QUESTION_TYPES,
  QUESTION_TYPES_OPTIONS,
} from "@/utils/constants";
import MultiLineTextFieldComponent from "@/components/Common/FormFields/MultiLineTextField";

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

const StyledAddNewQuestionSection = styled(Box)(({ theme }) => ({
  width: "100%",
  border: `2px dashed ${theme.palette.grey[300]}`,
  padding: 20,
}));

const QuestionForm = () => {
  const { control, watch } = useForm({
    mode: "all",
    defaultValues: {
      questions: [defaultQuestionValues],
    },
  });
  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = watch("questions");

  React.useEffect(() => {
    const subscription = watch(() => null);
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Grid container>
      <Grid item container md={8} spacing={2}>
        {questions.map((question, index) => (
          <Grid container item xs={12} key={index + 1}>
            <Grid item>
              <StyledQuestionNumber>{index + 1}</StyledQuestionNumber>
            </Grid>
            <Grid item xs>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${index + 1}-content`}
                  id={`${index + 1}-header`}
                >
                  <Box pl={2} pr={2}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Box mt={0.8}>
                          <img alt="icon" src="/icons/question.svg" />
                        </Box>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="subtitle1">
                          {watchQuestions[index].title
                            ? watchQuestions[index].title
                            : "[No Title]"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box p={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box mb={1}>
                          <FormLabel>Title *</FormLabel>
                        </Box>
                        <TextInputFieldComponent
                          id="question-title"
                          name={`questions.${index}.title`}
                          label=""
                          defaultValue={question.title}
                          control={control}
                          rules={{
                            required:
                              "Title is a required field. Please provide a title.",
                          }}
                          textFieldProps={{
                            placeholder: "Enter Title",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box mb={1}>
                          <FormLabel>Add Question Type *</FormLabel>
                        </Box>
                        <SelectInputFieldComponent
                          defaultValue={question.questionType}
                          options={QUESTION_TYPES_OPTIONS}
                          targetValue="value"
                          lableValue="label"
                          label=""
                          control={control}
                          id="question-type"
                          name={`questions.${index}.questionType`}
                          rules={{
                            required:
                              "Add Question Type is a required field. Please provide a Add Question Type.",
                          }}
                        />
                      </Grid>
                      {(watchQuestions[index].questionType ===
                        QUESTION_TYPES.AUDIO ||
                        watchQuestions[index].questionType ===
                          QUESTION_TYPES.INTRODUCTION) && (
                        <Grid item xs={12}>
                          <Box mb={1}>
                            <FormLabel>Content *</FormLabel>
                          </Box>
                          <Box>
                            <TextInputFieldComponent
                              id="question"
                              name={`questions.${index}.value`}
                              label=""
                              defaultValue={question.value}
                              control={control}
                              rules={{
                                required:
                                  "Question is a required field. Please provide a question.",
                              }}
                              textFieldProps={{
                                placeholder: "Enter Question",
                                multiline: true,
                                rows: 5,
                              }}
                            />
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <StyledAddNewQuestionSection
            onClick={() => {
              append(defaultQuestionValues);
            }}
          >
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
                  Select from Rating Scale, Multiple-Choice, Likert Scale,
                  Open-Text, Yes/No, Checklist, etc.
                </Typography>
              </Grid>
            </Grid>
          </StyledAddNewQuestionSection>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionForm;
