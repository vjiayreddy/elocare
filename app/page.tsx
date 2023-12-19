"use client";
import UserListDataGrid from "@/components/Common/DataGrids/UserListDataGrid/UserListDataGrid";
import SearchInputComponent from "@/components/Common/SearchInput/SearchInput";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import { useLazyFilterPatientsQuery } from "@/redux/api/patientsApi";
import { APP_ROUTES } from "@/routes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import _ from "lodash";
import HomeContainerComponent from "@/components/Home/HomeContainer";
import SearchResultsComponent from "@/components/Home/SearchResults";
import { Container } from "@mui/material";

export default function Home() {
  const searchParams = useSearchParams();
  const patient = searchParams.get("patient");
  const [searchTerm, setSearchTeam] = useState<any>(patient || "");
  const router = useRouter();
  const [filterPatients, { isLoading, isError, data: userData }] =
    useLazyFilterPatientsQuery();

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`${APP_ROUTES.HOME}?patient=${searchTerm}`);
    } else {
      router.push(APP_ROUTES.HOME);
    }
  };

  useEffect(() => {
    if (patient) {
      filterPatients({
        search: patient,
      });
    } else {
      filterPatients({});
    }
  }, [router, patient]);

  return (
    <MainLayoutComponent>
      <HomeContainerComponent>
        <Box component="div" className="__section_header">
          <Container disableGutters maxWidth="lg">
            <Grid container>
              <Grid item md={5} xs={12}>
                <SearchInputComponent
                  value={searchTerm as string}
                  onChange={(e) => {
                    setSearchTeam(e.target.value);
                  }}
                  onClickBtn={handleSearch}
                  btnName="Search"
                  placeholder="Search..."
                />
              </Grid>
              <Grid item xs={12}>
                <SearchResultsComponent count={userData?.data?.length || 0} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box component="div" className="__section_content">
          <UserListDataGrid loading={isLoading} rows={userData?.data || []} />
        </Box>
      </HomeContainerComponent>
    </MainLayoutComponent>
  );
}
