import React, { Fragment } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import moment from "moment";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: 0,
  borderLeft: "none",
  borderRight: "none",
  fontSize: 12.4,
  "& .MuiDataGrid-cell": {
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontSize: 16,
  },
  "& .MuiDataGrid-columnHeader": {
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontWeight: 600,
    backgroundColor: theme.palette.grey[100],
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: 16,
  },
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
      //width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      //width: 150,
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      //width: 110,
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
      //width: 160,
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
    <Box sx={{ height: 500, width: "100%" }}>
      <StyledDataGrid
        rows={rows}
        loading={loading}
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
    </Box>
  );
};

export default UserListDataGrid;
