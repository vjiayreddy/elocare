import React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LoadingButtonComponent from "../Buttons/LoadingButton";
import SearchInputComponent from "../SearchInput/SearchInput";

interface SearchBarWithActionsComponentProps {
  onClickNewFoder: () => void;
  onClickStudyFolder: () => void;
  showNewFolderButton?: boolean;
}

const SearchBarWithActionsComponent = ({
  onClickNewFoder,
  onClickStudyFolder,
  showNewFolderButton = true,
}: SearchBarWithActionsComponentProps) => {
  return (
    <Grid container columnSpacing={3} alignItems="center">
      <Grid item xs container>
        <Grid item xs={6}>
          <SearchInputComponent placeholder="Search..." />
        </Grid>
      </Grid>
      {/* <Grid item>
        <IconButton>
          <img alt="list-icon" src="/icons/list.svg" />
        </IconButton>
      </Grid> */}
      {/* <Grid item>
        <IconButton>
          <img alt="grid-icon" src="/icons/grid.svg" />
        </IconButton>
      </Grid> */}
      {showNewFolderButton && (
        <Grid item>
          <Button onClick={onClickNewFoder} variant="outlined" color="inherit">
            New Binder
          </Button>
        </Grid>
      )}

      <Grid item>
        <LoadingButtonComponent
          onClick={onClickStudyFolder}
          btnProps={{
            variant: "contained",
            color: "primary",
            startIcon: <img alt="plus-icon" src="/icons/plus_white.svg" />,
          }}
        >
          New Assessment
        </LoadingButtonComponent>
      </Grid>
    </Grid>
  );
};

export default SearchBarWithActionsComponent;
