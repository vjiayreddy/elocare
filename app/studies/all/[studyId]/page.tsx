"use client";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import Box from "@mui/material/Box";
import React, { Fragment, useEffect, useState } from "react";
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
import { Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import LoadingButtonComponent from "@/components/Common/Buttons/LoadingButton";
import { APP_ROUTES } from "@/routes";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import StudiesLayoutComponent from "@/components/Studies/StudiesLayout";
import WelcomeAssessmentComponent from "@/components/Studies/WelcomeAssessment";
import TabsSelectionComponent from "@/components/Studies/TabsSelection";
import { getAssessmentQuestionsPayload } from "@/redux/utils";
import VideoTemplateFormComponent from "@/components/Studies/QuestionForm/TemplateForms/VideoTemplateForm";
import IntroductionFormComponent from "@/components/Studies/QuestionForm/TemplateForms/IntroductionForm";
import VoiceFormComponent from "@/components/Studies/QuestionForm/TemplateForms/VoiceTemplateForm";

const StudyAssessmentDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const isEditable = searchParams.get("isEditable");
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [selectedAudience, setSelectedAudiences] = useState<string[]>([]);
  const childrenRef: any = React.useRef({});

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
  const {
    fields: questions,
    append,
    move,
  } = useFieldArray({
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
    const payload = getAssessmentQuestionsPayload(
      data,
      params?.studyId as string
    );
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
    if (!_.isEmpty(data)) {
      let questions: any[] = [];
      if (!_.isEmpty(data?.questions)) {
        data?.questions.map((question: any) => {
          questions.push({
            title: question?.title,
            _id: question?._id,
            value: question?.value,
            questionType: question?.questionType?.[0],
            responseType: filterResponseType(question?.responseType),
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

  const reorder = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    const sourceIndex = source.index;
    const destIndex = destination.index;

    if (type === "parentContainer") {
      move(sourceIndex, destIndex);
    } else if (type === "childContainer" && source.droppableId) {
      const reorderChild = childrenRef.current[source.droppableId];
      if (reorderChild) {
        reorderChild(sourceIndex, destIndex);
      }
    }
  };

  return (
    <MainLayoutComponent>
      <StudiesLayoutComponent>
        <Box component="div" className="__section_header">
          <Container disableGutters maxWidth="lg">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs></Grid>
              <Grid item>
                <Button
                  size="small"
                  color="inherit"
                  onClick={() => {
                    router.push(APP_ROUTES.STUDIES);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <LoadingButtonComponent
                  showLoading={isLoadingUpdateBlukQuestion}
                  btnProps={{
                    size: "small",
                    color: "inherit",
                    disabled:
                      isEditable === "false" || isLoadingUpdateBlukQuestion,
                  }}
                  onClick={handleSubmit(handleSubmitQuestions)}
                >
                  Save Changes
                </LoadingButtonComponent>
              </Grid>
              <Grid item>
                <Button size="small" onClick={openConfirmModel} color="primary">
                  {selectedAudience?.length > 0
                    ? "Launch Assessment"
                    : "Continue to Audience"}
                </Button>
              </Grid>
            </Grid>
            <TabsSelectionComponent
              tabIndex={tabIndex}
              onChange={(_, value) => {
                setTabIndex(value);
              }}
            />
          </Container>
        </Box>
        <Box component="div" className="__section_content">
          <Container disableGutters maxWidth="lg">
            <Box mt={2} mb={2}>
              {tabIndex === 0 && (
                <Fragment>
                  <WelcomeAssessmentComponent />
                  <DragDropContext onDragEnd={reorder}>
                    <Droppable droppableId="parent" type="parentContainer">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {questions.map((question: any, index) => {
                            return (
                              <Draggable
                                key={question.id}
                                draggableId={question.id}
                                index={index}
                              >
                                {(provided: any) => (
                                  <Box
                                    mb={2}
                                    component="div"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div
                                      className="DragHandle"
                                      {...provided.dragHandleProps}
                                    >
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
                                            defaultValue={question?._id}
                                            {...register(
                                              `questions.${index}._id`
                                            )}
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
                                                <FormLabel>
                                                  Add Question Type *
                                                </FormLabel>
                                              </Box>
                                              <SelectInputFieldComponent
                                                defaultValue={
                                                  question.questionType
                                                }
                                                // readOnly={true}
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
                                            {watchQuestions[index]
                                              .questionType ===
                                              QUESTION_TYPES.INTRODUCTION && (
                                              <IntroductionFormComponent
                                                control={control}
                                                index={index}
                                                question={question}
                                              />
                                            )}

                                            {(watchQuestions[index]
                                              .questionType ===
                                              QUESTION_TYPES.AUDIO ||
                                              watchQuestions[index]
                                                .questionType ===
                                                QUESTION_TYPES.TEXT) && (
                                              <VoiceFormComponent
                                                control={control}
                                                index={index}
                                                question={question}
                                              />
                                            )}
                                            {watchQuestions[index]
                                              .questionType ===
                                              QUESTION_TYPES.VIDEO && (
                                              <VideoTemplateFormComponent
                                                control={control}
                                                index={index}
                                                question={question}
                                              />
                                            )}
                                          </Grid>
                                        </Box>
                                      </QuestionAccordion>
                                    </div>
                                  </Box>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <Box>
                    <AddQuestionButtonComponent
                      onClick={() => {
                        append(defaultQuestionValues);
                      }}
                    />
                  </Box>
                </Fragment>
              )}
              {tabIndex === 1 && (
                <AudienceDataGridComponent
                  onRowSelectionModelChange={(data) => {
                    setSelectedAudiences(data);
                  }}
                />
              )}
            </Box>
          </Container>
        </Box>
      </StudiesLayoutComponent>
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
