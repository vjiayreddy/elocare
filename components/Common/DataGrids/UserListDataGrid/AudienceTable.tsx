import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useLazyFilterPatientsQuery } from "@/redux/api/patientsApi";
import _ from "lodash";
import moment from "moment";
import Grid from "@mui/material/Grid";
import { Chip, Typography } from "@mui/material";
import SearchInputComponent from "../../SearchInput/SearchInput";
import { useDebounce } from "use-debounce";

interface AudienceDataGridComponentProps {
  onRowSelectionModelChange?: (data: any) => void;
}

const StyledAudienceDataGridComponent = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.grey[100],
  },
  "& .MuiDataGrid-cell": {
    fontSize: 14,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: 14,
  },
  "& .MuiTablePagination-toolbar": {
    height: 30,
  },
}));

const AudienceDataGridComponent = ({
  onRowSelectionModelChange,
}: AudienceDataGridComponentProps) => {
  const [filterPatients, { isLoading, isError, data: userData, isFetching }] =
    useLazyFilterPatientsQuery();
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  React.useEffect(() => {
    filterPatients({});
  }, []);

  React.useEffect(() => {
    filterPatients({
      ...(debouncedValue && {
        search: debouncedValue,
      }),
    });
  }, [debouncedValue]);

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
      <Box p={1} mt={2} mb={2}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item md={8} container alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1">All Patients</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                size="small"
                color="secondary"
                label={
                  !_.isEmpty(userData?.data)
                    ? `${userData?.data?.length} Users`
                    : "O Users"
                }
              />
            </Grid>
          </Grid>
          <Grid item md={4}>
            <SearchInputComponent
              placeholder="Search by user name..."
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <StyledAudienceDataGridComponent
        rows={userData?.data || []}
        density="compact"
        columns={columns}
        loading={isLoading || isFetching}
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
