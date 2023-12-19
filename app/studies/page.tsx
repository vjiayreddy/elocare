"use client";
import React, { Fragment, useEffect, useState } from "react";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import SearchBarWithActionsComponent from "@/components/Common/SearchBarWithActions/SearchBarWithActions";
import Box from "@mui/material/Box";
import DataFiltersComponent from "@/components/Common/Filters/DataFilters";
import { useRouter } from "next/navigation";
import CreateFolderForm from "@/components/Studies/CreateFolderForm/CreateFolderForm";
import { useLazyFetchFoldersAndStudiesQuery } from "@/redux/api/studiesApi";
import { APP_ROUTES } from "@/routes";
import _ from "lodash";
import { useSession } from "next-auth/react";
import StudiesLayoutComponent from "@/components/Studies/StudiesLayout";
import BindersListComponent from "@/components/Studies/BindersList";
import StudiesListComponent from "@/components/Studies/StudiesList";
import { useDebounce } from "use-debounce";
import { Container } from "@mui/material";
import LoadingIndicatorComponent from "@/components/Common/LoadingIndicator/LoadingIndicator";

const StudiesPage = () => {
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const { data: session } = useSession();
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);
  const [fetchFoldersAndStudies, { data, isFetching, isLoading }] =
    useLazyFetchFoldersAndStudiesQuery();

  useEffect(() => {
    if (session) {
      fetchFoldersAndStudies({
        doctorId: session?.user?.id as string,
        ...(debouncedValue && {
          search: debouncedValue,
        }),
      });
    }
  }, [session, debouncedValue]);

  return (
    <MainLayoutComponent>
      <StudiesLayoutComponent>
        <Box component="div" className="__section_header">
          <Container disableGutters maxWidth="lg">
            <Box mb={2}>
              <SearchBarWithActionsComponent
                onChangeSeachInput={(e) => {
                  setInputValue(e.target.value);
                }}
                onClickNewFoder={() => {
                  setOpenModel(true);
                }}
                onClickStudyFolder={() => {
                  router.push(APP_ROUTES.All_STUDIES);
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
              <Fragment>
                <Box mb={3}>
                  <BindersListComponent
                    bindersData={data?.data?.projectData || []}
                  />
                </Box>
                <Box mb={5}>
                  <StudiesListComponent
                    studiesData={data?.data?.studyData || []}
                  />
                </Box>
              </Fragment>
            )}
          </Container>
        </Box>
      </StudiesLayoutComponent>
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
    </MainLayoutComponent>
  );
};

export default StudiesPage;
