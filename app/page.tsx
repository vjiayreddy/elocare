"use client";
import UserListDataGrid from "@/components/Common/DataGrids/UserListDataGrid/UserListDataGrid";
import SearchInputComponent from "@/components/Common/SearchInput/SearchInput";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import { useLazyFilterPatientsQuery } from "@/redux/api/patientsApi";
import { API_ROUTES } from "@/redux/api/routers";
import { APP_ROUTES } from "@/routes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import _ from "lodash";

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
        dateOfBirth: patient,
      });
    } else {
      filterPatients({});
    }
  }, [router, patient]);
  return (
    <MainLayoutComponent>
      <Box mt={6} mb={4} component="div" className="__layout_header">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SearchInputComponent onChange={() => {}} placeholder="Search..." />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Box mt={6}>
          <Typography variant="h4">Search Results</Typography>
          <Typography variant="body1">
            {patient ? (
              <>
                {userData?.data?.length} results for <b>{patient}</b>
              </>
            ) : (
              <>
                <>
                  Total <b>{userData?.data?.length}</b> Users
                </>
              </>
            )}
          </Typography>
        </Box>
      </Box>
      <Box component="div" className="__layout__content">
        <UserListDataGrid loading={isLoading} rows={userData?.data || []} />
      </Box>
    </MainLayoutComponent>
  );
}
