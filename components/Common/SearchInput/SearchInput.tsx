"use client";
import React from "react";
import { StyledSearchInputComponent } from "./styled";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

interface SearchInputComponentProps {
  btnName?: string;
  onClickBtn?: () => void;
  value?: string;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SearchInputComponent = ({
  value,
  placeholder,
  btnName,
  onClickBtn,
  onChange,
}: SearchInputComponentProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <StyledSearchInputComponent>
          <TextField
            fullWidth
            size="small"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            InputProps={{
              startAdornment: <img src="/icons/search.svg" />,
            }}
          />
        </StyledSearchInputComponent>
      </Grid>
      {btnName && (
        <Grid item>
          <Button size="small" onClick={onClickBtn}>
            {btnName ? btnName : "Search"}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchInputComponent;
