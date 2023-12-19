import React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LoadingButtonComponent from "../Buttons/LoadingButton";
import SearchInputComponent from "../SearchInput/SearchInput";

interface SearchBarWithActionsComponentProps {
  onClickNewFoder: () => void;
  onClickStudyFolder: () => void;
  onChangeSeachInput?:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
  showNewFolderButton?: boolean;
}

const SearchBarWithActionsComponent = ({
  onClickNewFoder,
  onClickStudyFolder,
  onChangeSeachInput,
  showNewFolderButton = true,
}: SearchBarWithActionsComponentProps) => {
  return (
    <Grid container columnSpacing={3} alignItems="center">
      <Grid item xs container>
        <Grid item xs={6}>
          <SearchInputComponent placeholder="Search by studies, or binders..." onChange={onChangeSeachInput} />
        </Grid>
      </Grid>
      <Grid item>
        <IconButton>
          <img alt="list-icon" src="/icons/list.svg" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <img alt="grid-icon" src="/icons/grid.svg" />
        </IconButton>
      </Grid>
      {showNewFolderButton && (
        <Grid item>
          <Button
            size="small"
            onClick={onClickNewFoder}
            color="inherit"
            variant="contained"
          >
            New Binder
          </Button>
        </Grid>
      )}

      <Grid item>
        <LoadingButtonComponent
          onClick={onClickStudyFolder}
          btnProps={{
            size: "small",

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
