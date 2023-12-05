"use client";
import React, { useEffect } from "react";
import BackLableButtonComponent from "@/components/Common/Buttons/BackLableButton";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DeviceFrameView from "@/components/Studies/DeviceFrameView/DeviceFrameView";
import Typography from "@mui/material/Typography";
import AssessmentCardComponent from "@/components/Common/Cards/AssessmentCard/AssessmentCard";
import UserAvatarWithLabel from "@/components/Common/UserAvatarWithLabel/UserAvatarWithLabel";
import TagComponent from "@/components/Common/Tag/Tag";
import DropDownWithCheckBoxComponent from "@/components/Common/DropDowns/DropDownWithCheckBox";
import {
  useLazyFetchConditionalBasedAssessmentTemplatesQuery,
  useLazyFetchSingleTemplateQuestionsQuery,
} from "@/redux/api/studiesApi";
import { useParams, useRouter, usePathname } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import { useDispatch, useSelector } from "react-redux";
import { setAssessmentTemplateQuestionData } from "@/redux/reducers/projectFolderAndstudySlice";

const ViewStudyTemplate = () => {
  const [
    fetchConditionalBasedAssessmentTemplates,
    {
      isLoading: isLoadingConditionalBasedAssessmentTemplates,
      isSuccess: isSuccessConditionalBasedAssessmentTemplates,
      data: dataConditionalBasedAssessmentTemplates,
    },
  ] = useLazyFetchConditionalBasedAssessmentTemplatesQuery();
  const params = useParams();
  const dispatch = useDispatch();
  const { selectedTemplateQuestionData } = useSelector(
    (state: any) => state?.projectFolderAndstudySlice
  );

  useEffect(() => {
    fetchConditionalBasedAssessmentTemplates({
      id: params?.slug[0] as string,
    });
  }, [params?.slug[0]]);

  useEffect(() => {
    if (dataConditionalBasedAssessmentTemplates) {
      dispatch(
        setAssessmentTemplateQuestionData(
          dataConditionalBasedAssessmentTemplates?.[0]
        )
      );
    }
  }, [dataConditionalBasedAssessmentTemplates]);

  return (
    <MainLayoutComponent>
      <Box mt={3} mb={5}>
        <BackLableButtonComponent />
      </Box>
      <Grid mb={10} container spacing={3}>
        <Grid item xs={12} container spacing={4}>
          <Grid item xs>
            {selectedTemplateQuestionData?.assessmentTemplateData?.title}
          </Grid>
          <Grid item>
            <DropDownWithCheckBoxComponent
              id="platform"
              placeholder="Share"
              options={["Share"]}
            />
          </Grid>
          <Grid item xs={12}>
            <DeviceFrameView questions={selectedTemplateQuestionData} />
          </Grid>
          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">About this assessment</Typography>
            </Grid>
            <Grid item spacing={3} container md={9}>
              {dataConditionalBasedAssessmentTemplates?.length > 0 && (
                <>
                  {dataConditionalBasedAssessmentTemplates.map(
                    (item: any, index: number) => (
                      <Grid item md={3} key={item.assessmentTemplateId}>
                        <AssessmentCardComponent
                          boxProps={{
                            sx: {
                              border:
                                item?.assessmentTemplateId ===
                                selectedTemplateQuestionData?.assessmentTemplateId
                                  ? `2px solid black`
                                  : "",
                            },
                          }}
                          onClick={() => {
                            dispatch(setAssessmentTemplateQuestionData(item));
                          }}
                          data={{
                            index: index + 1,
                            title: item?.assessmentTemplateData?.title,
                          }}
                        />
                      </Grid>
                    )
                  )}
                </>
              )}

              <Grid item xs={12}>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Box pl={2}>
                <UserAvatarWithLabel authorName="Dr. Jun-Ho Kim" />
                <Box mt={3} mb={2}>
                  <Typography fontWeight={600} variant="body1">
                    Tags
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item>
                    <TagComponent label="Parkinson’s" />
                  </Grid>
                  <Grid item>
                    <TagComponent label="PD" />
                  </Grid>
                  <Grid item>
                    <TagComponent label="Infusion #2" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainLayoutComponent>
  );
};

export default ViewStudyTemplate;
