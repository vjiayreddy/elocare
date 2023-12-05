"use client";
import DataFiltersComponent from "@/components/Common/Filters/DataFilters";
import SearchBarWithActionsComponent from "@/components/Common/SearchBarWithActions/SearchBarWithActions";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import { Typography } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import { useFetchStudiesByFolderIdQuery } from "@/redux/api/studiesApi";
import StudyCardComponent from "@/components/Common/Cards/StudyCard/StudyCard";

const StudiesListPage = () => {
  const router = useRouter();
  const params = useParams();
  const { data } = useFetchStudiesByFolderIdQuery({
    projectId: params?.id as string,
  });

  const handleRouter = () => {
    router.push(`${APP_ROUTES.All_STUDIES}?binderId=${params?.id}`);
  };

  return (
    <MainLayoutComponent>
      <Box mt={5}>
        <SearchBarWithActionsComponent
          onClickNewFoder={() => {}}
          onClickStudyFolder={handleRouter}
          showNewFolderButton={false}
        />
        <Box mt={3}>
          <DataFiltersComponent />
        </Box>
      </Box>

      {data?.data?.length > 0 ? (
        <Box mt={4}>
          <Grid container spacing={2}>
            {data?.data.map((item: any, index: number) => (
              <Grid item xs={3} key={index}>
                <StudyCardComponent
                  key={item?._id}
                  id={item?._id}
                  label={item?.label as string}
                  title={item?.title as string}
                  status={`${item?.members?.length} responses`}
                  iconType="STUDY"
                  onRenameFolder={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box mt={15}>
          <Grid
            container
            spacing={2}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <img src="/images/no_studies.svg" />
            </Grid>
            <Grid item>
              <Typography textAlign="center" fontWeight={700} variant="body1">
                Your studies will appear here
              </Typography>
              <Typography textAlign="center" fontWeight={500} variant="body2">
                Get started by adding your first study
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </MainLayoutComponent>
  );
};

export default StudiesListPage;
