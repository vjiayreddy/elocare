"use client";
import React, { Fragment, useEffect, useState } from "react";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import StudiesListComponent from "@/components/Common/Lists/StudiesList/StudiesList";
import { Container, Typography } from "@mui/material";
import TemplateCardComponent from "@/components/Common/Cards/TemplateCard/TemplateCard";
import SearchInputComponent from "@/components/Common/SearchInput/SearchInput";
import { useLazyFetchAllTemplatesQuery } from "@/redux/api/studiesApi";
import ConditionalListComponent from "@/components/Common/Lists/StudiesList/ConditionalList";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import CreateStudyForm from "@/components/Studies/CreateFolderForm/CreateStudyForm";
import { useDispatch } from "react-redux";
import { setTemplateStudy } from "@/redux/reducers/projectFolderAndstudySlice";

const AllStudiesPage = () => {
  const dispatch = useDispatch();
  const [fetchAllTemplates, { data }] = useLazyFetchAllTemplatesQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const binderId = searchParams.get("binderId");
  const [openModel, setOpenModel] = useState<boolean>(false);

  useEffect(() => {
    fetchAllTemplates({});
  }, []);

  return (
    <MainLayoutComponent>
      <Container maxWidth="lg">
        <Box mt={3} mb={4}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              <Box mt={0.8}>
                <img alt="home" src="/icons/home.svg" />
              </Box>
            </Link>
            <Link underline="hover" color="inherit" href="/">
              Studies
            </Link>
            <Link underline="hover" color="inherit" href="/">
              All Studies
            </Link>
          </Breadcrumbs>
        </Box>
        <Box mb={5}>
          <Grid container>
            <Grid item md={3}>
              {data?.data?.conditionBasedAssessmentTemplate?.length > 0 && (
                <Box mb={3}>
                  <ConditionalListComponent
                    listItems={data?.data?.conditionBasedAssessmentTemplate}
                    listTitle={"Condition Based"}
                    showListCounter={true}
                  />
                </Box>
              )}
              {data?.data?.assessmentTemplateCategory.map((template: any) => (
                <Box mb={3} key={template?._id}>
                  {template?.assessmentTemplateData?.length > 0 && (
                    <StudiesListComponent
                      listItems={template?.assessmentTemplateData}
                      listTitle={template?.title}
                    />
                  )}
                </Box>
              ))}
            </Grid>

            <Grid item md={9}>
              <Box pl={15}>
                <Grid spacing={4} container>
                  <Grid item xs={12}>
                    <SearchInputComponent placeholder="Search for templates..." />
                  </Grid>
                  {data?.data?.conditionBasedAssessmentTemplate?.length > 0 && (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          Condition-based assessments
                        </Typography>
                      </Grid>

                      <Grid item xs={12} container spacing={2}>
                        {data?.data?.conditionBasedAssessmentTemplate?.map(
                          (t: any) => (
                            <Grid item md={3} key={t?._id}>
                              <TemplateCardComponent
                                onClick={() => {
                                  router.push(
                                    `${APP_ROUTES.STUDIES_TEMPLATE_VIEW}/${t?._id}?binderId=${binderId}`
                                  );
                                }}
                                data={{
                                  title: t?.title,
                                  authorName: "Dr. Jun-Ho Kim",
                                  totalTemplates:
                                    t?.assessmentTemplates?.[0]?.length,
                                }}
                              />
                            </Grid>
                          )
                        )}
                      </Grid>
                    </>
                  )}

                  {data?.data.assessmentTemplateCategory?.length > 0 && (
                    <>
                      {data?.data.assessmentTemplateCategory?.map(
                        (template: any) => (
                          <Fragment key={template._id}>
                            {template?.assessmentTemplateData?.length > 0 && (
                              <>
                                <Grid item xs={12}>
                                  <Typography variant="subtitle1">
                                    {template?.title}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} container spacing={2}>
                                  {template?.assessmentTemplateData?.map(
                                    (t: any) => (
                                      <Grid item key={t._id} md={3}>
                                        <TemplateCardComponent
                                          onClick={() => {
                                            dispatch(
                                              setTemplateStudy({
                                                assessmentTemplateId: t._id,
                                                title: t?.title,
                                                description: t?.description,
                                                isDoctorLocked:
                                                  t?.isDoctorLocked,
                                                projectId: binderId,
                                                isEditable: t?.isEditable,
                                                isAsNeededAssessment:
                                                  t?.isAsNeededAssessment,
                                              })
                                            );
                                            setOpenModel(true);
                                          }}
                                          data={{
                                            title: t.title,
                                            authorName: "Dr. Jun-Ho Kim",
                                            totalTemplates: null,
                                          }}
                                        />
                                      </Grid>
                                    )
                                  )}
                                </Grid>
                              </>
                            )}
                          </Fragment>
                        )
                      )}
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {openModel && (
          <CreateStudyForm
            open={openModel}
            onClose={() => {
              setOpenModel(false);
            }}
            onCompleted={() => {}}
          />
        )}
      </Container>
    </MainLayoutComponent>
  );
};

export default AllStudiesPage;
