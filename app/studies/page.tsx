"use client";
import React, { Fragment, useEffect, useState } from "react";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import SearchBarWithActionsComponent from "@/components/Common/SearchBarWithActions/SearchBarWithActions";
import Box from "@mui/material/Box";
import DataFiltersComponent from "@/components/Common/Filters/DataFilters";
import Grid from "@mui/material/Grid";
import FolderCardComponent from "@/components/Common/Cards/FolderCard/FolderCard";
import { useRouter } from "next/navigation";
import CreateFolderForm from "@/components/Studies/CreateFolderForm/CreateFolderForm";
import { useLazyFetchFoldersAndStudiesQuery } from "@/redux/api/studiesApi";
import Typography from "@mui/material/Typography";
import StudyCardComponent from "@/components/Common/Cards/StudyCard/StudyCard";
import {
  setProjectFolder,
  setTemplateStudy,
} from "@/redux/reducers/projectFolderAndstudySlice";
import { useDispatch } from "react-redux";
import { APP_ROUTES } from "@/routes";
import _ from "lodash";
import CreateStudyForm from "@/components/Studies/CreateFolderForm/CreateStudyForm";
import { useSession } from "next-auth/react";

const StudiesPage = () => {
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const { data: session } = useSession();
  const [openStudyForm, setOpenStudyForm] = useState(false);
  const dispatch = useDispatch();
  const [fetchFoldersAndStudies, { data }] =
    useLazyFetchFoldersAndStudiesQuery();

  useEffect(() => {
    if (session) {
      fetchFoldersAndStudies({
        doctorId: session?.user?.id as string,
      });
    }
  }, [session]);


  console.log(data)

  return (
    <MainLayoutComponent>
      <Box mt={5}>
        <SearchBarWithActionsComponent
          onClickNewFoder={() => {
            setOpenModel(true);
          }}
          onClickStudyFolder={() => {
            router.push(APP_ROUTES.All_STUDIES);
          }}
        />
        <Box mt={3}>
          <DataFiltersComponent />
        </Box>
      </Box>
      <Box mt={6} mb={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography mb={2} mt={2} variant="subtitle1">
              Binders
            </Typography>
          </Grid>
          {!_.isEmpty(data?.data.projectData) ? (
            <Fragment>
              {data?.data.projectData.map((item: any, index) => (
                <Grid item xs={3} key={item?._id}>
                  <FolderCardComponent
                    folderId={item?._id as string}
                    key={item?._id}
                    onRenameFolder={() => {
                      dispatch(setProjectFolder(item));
                      setOpenModel(true);
                    }}
                    title={item?.title as string}
                    status={
                      item?.studyDataCount?.studyCount
                        ? `${item?.studyDataCount?.studyCount} Studies`
                        : "0 Studies"
                    }
                    iconType="FOLDER"
                  />
                </Grid>
              ))}
            </Fragment>
          ) : (
            <Grid
              item
              container
              flexDirection="column"
              alignItems="center"
              justifyItems="center"
              xs={12}
            >
              <Grid item>
                <img src="/images/no_studies.svg" />
              </Grid>
              <Grid item>
                <Typography textAlign="center" fontWeight={700} variant="body1">
                  Your Binders will appear here
                </Typography>
                <Typography textAlign="center" fontWeight={500} variant="body2">
                  Get started by adding your first binder
                </Typography>
              </Grid>
            </Grid>
          )}



          <Grid item xs={12}>
            <Typography mb={2} mt={2} variant="subtitle1">
              Studies
            </Typography>
          </Grid>
          {!_.isEmpty(data?.data.studyData) ? (
            <Fragment>
              {data?.data.studyData.map((item: any, index) => (
                <Grid item xs={3} key={index}>
                  <StudyCardComponent
                    id={item?._id as string}
                    isEditable={item?.isEditable}
                    key={item?._id}
                    label={item?.label as string}
                    title={item?.title as string}
                    status="0 responses"
                    iconType="STUDY"
                    onRenameFolder={() => {
                      dispatch(
                        setTemplateStudy({
                          isUpdating: true,
                          ...item,
                        })
                      );
                      setOpenStudyForm(true);
                    }}
                  />
                </Grid>
              ))}
            </Fragment>
          ) : (
            <Grid
              item
              container
              flexDirection="column"
              alignItems="center"
              justifyItems="center"
              xs={12}
            >
              <Grid item>
                <img src="/images/no_studies.svg" />
              </Grid>
              <Grid item>
                <Typography textAlign="center" fontWeight={700} variant="body1">
                  Your Assessments will appear here
                </Typography>
                <Typography textAlign="center" fontWeight={500} variant="body2">
                  Get started by adding your first assessment
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
      {openModel && (
        <CreateFolderForm
          open={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
          onCompleted={() => {
            setOpenModel(false);
          }}
        />
      )}
      {openStudyForm && (
        <CreateStudyForm
          open={openStudyForm}
          onClose={() => {
            setOpenStudyForm(false);
          }}
          onCompleted={() => {}}
        />
      )}
    </MainLayoutComponent>
  );
};

export default StudiesPage;
