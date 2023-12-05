"use client";
import React from "react";
import { StyledFavoritesListBox } from "./styled";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ProgressBarComponent from "@/components/Common/DataCellProgressBar/DataCellProgressBar";
import IntoContentComponent from "@/components/Common/InfoContent/InfoContent";
import SearchInputComponent from "@/components/Common/SearchInput/SearchInput";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "irbNumber",
    headerName: "IRB Number",
    width: 150,
  },
  {
    field: "piName",
    headerName: "PI Name",
    width: 150,
  },
  {
    field: "onStudy",
    headerName: "On Study",
    width: 110,
    renderCell: (params: GridRenderCellParams) => (
      <ProgressBarComponent value={params.row.onStudy} />
    ),
  },
  {
    field: "onTreatment",
    headerName: "On Treatment",
    sortable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams) => (
      <ProgressBarComponent
        value={params.row.onTreatment}
        activeColor="#92B6F5"
      />
    ),
  },
  {
    field: "onFollowUp",
    headerName: "On Follow Up",
    sortable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams) => (
      <ProgressBarComponent
        value={params.row.onFollowUp}
        activeColor="#D6BDFF"
      />
    ),
  },
  {
    field: "totalAccural",
    headerName: "Total Accural",
    sortable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <ProgressBarComponent
        value={params.row.totalAccural}
        activeColor="#C1C7CD"
      />
    ),
  },
];

const rows = [
  {
    id: 1,
    irbNumber: "12-2345",
    piName: "Tap, William, MD",
    onStudy: 50,
    onTreatment: 23,
    onFollowUp: 30,
    totalAccural: 45,
  },
  {
    id: 2,
    irbNumber: "22-2345",
    piName: "Jenkins, Karen, MD",
    onStudy: 23,
    onTreatment: 44,
    onFollowUp: 32,
    totalAccural: 27,
  },
  {
    id: 3,
    irbNumber: "32-2345",
    piName: "Patel, Rahul, MD",
    onStudy: 45,
    onTreatment: 52,
    onFollowUp: 28,
    totalAccural: 33,
  },
  {
    id: 4,
    irbNumber: "42-2345",
    piName: "Mitchell, Susan, MD",
    onStudy: 22,
    onTreatment: 56,
    onFollowUp: 33,
    totalAccural: 24,
  },
];

const FavoritesListComponent = () => {


  return (
    <StyledFavoritesListBox>
      <Box component="div" className="main_section">
        <Box pl={20} pr={20}>
          <Grid mt={3} mb={3} container direction="column">
            <Grid mb={1} item xs={12}>
              <IntoContentComponent />
            </Grid>
            <Grid mb={1} item alignSelf="center" xs={12}>
              <Typography variant="body1">
                Find patients and access records for your managed protocols.
              </Typography>
            </Grid>
            <SearchInputComponent />
          </Grid>
        </Box>
        <Box mt={10} sx={{ height: 400, width: "100%" }}>
          <Typography mb={1}>Favorites</Typography>
          <DataGrid
            rows={rows}
            autoHeight={true}
            columns={columns}
            density="compact"
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </StyledFavoritesListBox>
  );
};

export default FavoritesListComponent;
