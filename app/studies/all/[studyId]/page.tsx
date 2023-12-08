"use client";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AudienceDataGridComponent from "@/components/Common/DataGrids/UserListDataGrid/AudienceTable";
import {
  useLazyFetchSingleTemplateQuestionsQuery,
  useUpdateStudyBulkQuestionsMutation,
  useUpdateStudyMutation,
} from "@/redux/api/studiesApi";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import {
  QUESTION_TYPES,
  QUESTION_TYPES_OPTIONS,
  defaultQuestionValues,
} from "@/utils/constants";
import QuestionAccordion from "@/components/Studies/QuestionForm/QuestionAccordion/QuestionAccordion";
import FormLabel from "@mui/material/FormLabel";
import TextInputFieldComponent from "@/components/Common/FormFields/TextInputField";
import SelectInputFieldComponent from "@/components/Common/FormFields/SelectInputField";
import AddQuestionButtonComponent from "@/components/Studies/QuestionForm/AddQuestionButton/AddQuestionButton";
import AutoCompleteInputFiled from "@/components/Common/FormFields/AutoCompleteField";
import _ from "lodash";
import { filterResponseType } from "@/utils/actions";
import ClosedDialogComponent from "@/components/Common/Dialogs/ClosedDialog/ClosedDialog";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import LoadingButtonComponent from "@/components/Common/Buttons/LoadingButton";
import { APP_ROUTES } from "@/routes";

const StudyAssessmentDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const isEditable = searchParams.get("isEditable");
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [selectedAudience, setSelectedAudiences] = useState<string[]>([]);
  const [updateStudy, { isLoading: isLoadingUpdateStudy }] =
    useUpdateStudyMutation();
  const [updateStudyBulkQuestions, { isLoading: isLoadingUpdateBlukQuestion }] =
    useUpdateStudyBulkQuestionsMutation();
  const { control, watch, handleSubmit, register, reset } = useForm({
    mode: "all",
    defaultValues: {
      questions: [defaultQuestionValues],
    },
  });
  const { fields: questions, append } = useFieldArray({
    control,
    name: "questions",
  });
  const watchQuestions = watch("questions");

  const [fetchSingleTemplateQuestions, { data }] =
    useLazyFetchSingleTemplateQuestionsQuery();

  useEffect(() => {
    fetchSingleTemplateQuestions({
      studyId: params?.studyId as string,
    });
  }, [params]);

  useEffect(() => {
    const subscription = watch(() => null);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleSubmitQuestions = (data: any) => {
    let payload: any[] = [];
    if (data?.questions?.length > 0) {
      data?.questions?.map((item: any) => {
        payload.push({
          ...item,
          studyId: params?.studyId as string,
          questionType: [item?.questionType],
          responseType: item?.responseType?.map((item: any) => item?.value),
        });
      });
    }

    updateStudyBulkQuestions({
      questions: payload,
    })
      .then((response: any) => {
        toast.success("Your changes have been successfully saved");
      })
      .catch((error) => {
        toast.success("Oops! Something went wrong. Please try again later");
      });
  };

  useEffect(() => {
    if (data) {
      let questions: any[] = [];
      if (data) {
        data.map((question: any) => {
          questions.push({
            title: question?.title,
            _id: question?._id,
            value: question?.value,
            questionType: question?.questionType?.[0],
            responseType: filterResponseType(question?.responseType),
            stage: question?.stage,
            demoVideoUrl: question?.demoVideoUrl,
          });
        });
        reset({
          questions,
        });
      }
    }
  }, [data]);

  const openConfirmModel = () => {
    if (selectedAudience.length > 0) {
      setOpenModel(true);
    }
  };

  const addMembersIntoStudy = () => {
    updateStudy({
      studyId: params?.studyId as string,
      patientIds: selectedAudience,
    })
      .then(() => {
        toast.success("Lanched Assessment Successfullly");
        setOpenModel(false);
      })
      .catch((error) => {
        toast.error("Something went wrong please try again");
        setOpenModel(false);
      });
  };

  return (
    <MainLayoutComponent>
      <Box mt={6}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs></Grid>
          <Grid item>
            <Button color="inherit" onClick={() => {router.push(APP_ROUTES.STUDIES)}}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <LoadingButtonComponent
              showLoading={isLoadingUpdateBlukQuestion}
              btnProps={{
                color: "inherit",
                disabled: isEditable === "false" || isLoadingUpdateBlukQuestion,
              }}
              onClick={handleSubmit(handleSubmitQuestions)}
            >
              Save Changes
            </LoadingButtonComponent>
          </Grid>
          <Grid item>
            <Button onClick={openConfirmModel} color="primary">
              {selectedAudience?.length > 0
                ? "Launch Assessment"
                : "Continue to Audience"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Tabs
          value={tabIndex}
          onChange={(_, value) => {
            setTabIndex(value);
          }}
        >
          <Tab label="Questions" />
          <Tab label="Audience" />
        </Tabs>
      </Box>
      <Box mt={4} mb={4}>
        {tabIndex === 0 && (
          <Grid container>
            <Grid item container md={8} spacing={2}>
              {questions.map((question, index) => (
                <QuestionAccordion
                  key={index + 1}
                  title={
                    watchQuestions[index].title
                      ? watchQuestions[index].title
                      : "[No Title]"
                  }
                  number={`${index + 1}`}
                  id={`${index + 1}-header`}
                  ariaControls={`${index + 1}-content`}
                >
                  <Box p={2}>
                    <input
                      type="hidden"
                      defaultValue={index + 1}
                      {...register(`questions.${index}.stage`)}
                    />
                    <input
                      type="hidden"
                      defaultValue={question?._id}
                      {...register(`questions.${index}._id`)}
                    />

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
                          readOnly={true}
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
                          QUESTION_TYPES.INTRODUCTION ||
                        watchQuestions[index].questionType ===
                          QUESTION_TYPES.TEXT ||
                        watchQuestions[index].questionType ===
                          QUESTION_TYPES.VIDEO) && (
                        <Grid item xs={12}>
                          <Box mb={1}>
                            {watchQuestions[index].questionType ===
                            QUESTION_TYPES.TEXT ? (
                              <FormLabel>Question *</FormLabel>
                            ) : (
                              <FormLabel>Content *</FormLabel>
                            )}
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
                                  "Please fill out all required fields before submitting the form.",
                              }}
                              textFieldProps={{
                                placeholder: "",
                                multiline: true,
                                rows: 5,
                              }}
                            />
                          </Box>
                        </Grid>
                      )}

                      {watchQuestions[index].questionType ===
                        QUESTION_TYPES.VIDEO && (
                        <Grid item xs={12}>
                          <Box mb={1}>
                            <FormLabel>Video Demo Url*</FormLabel>
                          </Box>
                          <Box>
                            <TextInputFieldComponent
                              id="question"
                              name={`questions.${index}.demoVideoUrl`}
                              label=""
                              defaultValue={question?.demoVideoUrl}
                              control={control}
                              rules={{
                                required:
                                  "Please fill out all required fields before submitting the form",
                              }}
                              textFieldProps={{
                                placeholder: "Enter demoVideoUrl",
                              }}
                            />
                          </Box>
                        </Grid>
                      )}

                      {watchQuestions[index].questionType !==
                        QUESTION_TYPES.INTRODUCTION &&
                        !_.isEmpty(watchQuestions[index].questionType) && (
                          <Grid item xs={12}>
                            <Box mb={1}>
                              <FormLabel>Add Response Type *</FormLabel>
                            </Box>
                            <Box>
                              <AutoCompleteInputFiled
                                control={control}
                                readOnly={true}
                                rules={{
                                  required: "Select atleast one member",
                                }}
                                isEqualValue="value"
                                targetValue="label"
                                id="response-type"
                                name={`questions.${index}.responseType`}
                                options={QUESTION_TYPES_OPTIONS || []}
                                multiple={true}
                                defaultValues={question?.responseType}
                              />
                            </Box>
                          </Grid>
                        )}
                    </Grid>
                  </Box>
                </QuestionAccordion>
              ))}
              {/* <Grid item xs={12}>
                <AddQuestionButtonComponent
                  onClick={() => {
                    append(defaultQuestionValues);
                  }}
                />
              </Grid> */}
            </Grid>
          </Grid>
        )}
        {tabIndex === 1 && (
          <AudienceDataGridComponent
            onRowSelectionModelChange={(data) => {
              setSelectedAudiences(data);
            }}
          />
        )}
      </Box>
      {openModel && (
        <ClosedDialogComponent
          open={openModel}
          onClickCloseIcon={() => {
            setOpenModel(false);
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <img alt="launch" src="/icons/lanch.svg" />
            </Grid>
            <Grid item xs={12}>
              <Typography mt={1} variant="h6">
                Ready to launch
              </Typography>
              <Typography color="GrayText" variant="body1">
                This assessment will be made available to (1) patient
                immediately.
              </Typography>
            </Grid>
            <Grid mt={2} item xs={4}>
              <Button
                disabled={isLoadingUpdateStudy}
                onClick={addMembersIntoStudy}
                fullWidth
              >
                Go Live
              </Button>
            </Grid>
          </Grid>
        </ClosedDialogComponent>
      )}
    </MainLayoutComponent>
  );
};

export default StudyAssessmentDetails;
