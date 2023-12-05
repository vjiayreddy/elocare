import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useLazyFilterPatientsQuery } from "@/redux/api/patientsApi";
import _ from "lodash";
import moment from "moment";

interface AudienceDataGridComponentProps {
  onRowSelectionModelChange?: (data: any) => void;
}

const StyledAudienceDataGridComponent = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.grey[100],
  },
  "& .MuiDataGrid-cell": {
    fontSize: 16,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: 16,
  },
}));

const AudienceDataGridComponent = ({onRowSelectionModelChange}:AudienceDataGridComponentProps) => {
  const [filterPatients, { isLoading, isError, data: userData }] =
    useLazyFilterPatientsQuery();

  React.useEffect(() => {
    filterPatients({
      
    });
  }, []);

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
        <React.Fragment>
          <span>
            {moment(new Date(params?.row?.createdAt)).format("MM-DD-YYYY")}
          </span>
        </React.Fragment>
      ),
    },
    {
      field: "isEmailVerified",
      headerName: "Email Verification",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <React.Fragment>
            {params?.row?.isEmailVerified ? <>Yes</> : <>No</>}
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <StyledAudienceDataGridComponent
        rows={userData?.data || []}
        columns={columns}
        loading={isLoading}
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
        pageSizeOptions={[100]}
        checkboxSelection
        onRowSelectionModelChange={(rowSelection) => {
          onRowSelectionModelChange?.(rowSelection);
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default AudienceDataGridComponent;
