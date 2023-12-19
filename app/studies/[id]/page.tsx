"use client";
import DataFiltersComponent from "@/components/Common/Filters/DataFilters";
import SearchBarWithActionsComponent from "@/components/Common/SearchBarWithActions/SearchBarWithActions";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import { useFetchStudiesByFolderIdQuery } from "@/redux/api/studiesApi";
import StudyCardComponent from "@/components/Common/Cards/StudyCard/StudyCard";
import { useDebounce } from "use-debounce";
import StudiesLayoutComponent from "@/components/Studies/StudiesLayout";
import LoadingIndicatorComponent from "@/components/Common/LoadingIndicator/LoadingIndicator";
import StudiesListComponent from "@/components/Studies/StudiesList";

const StudiesListPage = () => {
  const router = useRouter();
  const params = useParams();
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);
  const { data, isFetching, isLoading } = useFetchStudiesByFolderIdQuery({
    projectId: params?.id as string,
  });

  const handleRouter = () => {
    router.push(`${APP_ROUTES.All_STUDIES}?binderId=${params?.id}`);
  };

  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue]);

  return (
    <MainLayoutComponent>
      <StudiesLayoutComponent>
        <Box component="div" className="__section_header">
          <Container disableGutters maxWidth="lg">
            <Box mb={2}>
              <SearchBarWithActionsComponent
                onClickNewFoder={() => {}}
                onClickStudyFolder={handleRouter}
                showNewFolderButton={false}
                onChangeSeachInput={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </Box>
            <Box mb={4}>
              <DataFiltersComponent />
            </Box>
          </Container>
        </Box>
        <Box component="div" className="__section_content">
          <Container disableGutters maxWidth="lg">
            {isFetching && isLoading && <LoadingIndicatorComponent />}
            {!isFetching && !isLoading && (
              <Box mb={5}>
                <StudiesListComponent studiesData={data?.data || []} />
              </Box>
            )}
          </Container>
        </Box>
      </StudiesLayoutComponent>
    </MainLayoutComponent>
  );
};

export default StudiesListPage;
