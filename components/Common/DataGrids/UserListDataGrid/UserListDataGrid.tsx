'use client';
import React, { Fragment } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { Container } from "@mui/material";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: 5,
  fontSize: 12.4,
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiDataGrid-cell": {
    fontSize: 14,
  },
  "& .MuiDataGrid-columnHeader": {
    fontWeight: 600,
    backgroundColor: theme.palette.grey[100],
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: 14,
  },
  "& .MuiTablePagination-toolbar":{
    height:40
  }
}));
interface UserListDataGridProps {
  rows: any[];
  loading?: boolean;
}

const UserListDataGrid = ({ rows, loading }: UserListDataGridProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      flex: 1,
    },
    {
      field: "height",
      headerName: "Height",
      width: 100,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Registered",
      renderCell: (params: any) => (
        <Fragment>
          <span>
            {moment(new Date(params?.row?.createdAt)).format("MM-DD-YYYY")}
          </span>
        </Fragment>
      ),
    },
    {
      field: "isEmailVerified",
      headerName: "Email Verification",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Fragment>
            {params?.row?.isEmailVerified ? <>Yes</> : <>No</>}
          </Fragment>
        );
      },
    },
  ];

  return (
    <Container disableGutters maxWidth="lg" sx={{ height: "100%"}}>
      <StyledDataGrid
        rows={rows}
        loading={loading}
        density="compact"
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5]}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
      />
    </Container>
  );
};

export default UserListDataGrid;
