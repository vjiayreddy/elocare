"use client";
import React from "react";
import { StyledSearchInputComponent } from "./styled";
import TextField from "@mui/material/TextField";

interface SearchInputComponentProps {
  value?: string;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}


const SearchInputComponent = ({
  value,
  placeholder,
  onChange,
}: SearchInputComponentProps) => {
  return (
    <StyledSearchInputComponent>
      <TextField
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        InputProps={{
          startAdornment: <img src="/icons/search.svg" />,
        }}
      />
    </StyledSearchInputComponent>
  );
};

export default SearchInputComponent;
