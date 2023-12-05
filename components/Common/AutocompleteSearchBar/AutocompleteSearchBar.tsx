import React from "react";
import { StyledAutocompleteSearchComponent } from "./styled";
import InputBase from "@mui/material/InputBase";

const AutocompleteSearchBarComponent = () => {
  return (
    <StyledAutocompleteSearchComponent>
      <InputBase
        fullWidth={true}
        startAdornment={<img src="/icons/search.svg" />}
        placeholder="Search by Patient Number, Patient Name, or IRB Number"
      />
    </StyledAutocompleteSearchComponent>
  );
};

export default AutocompleteSearchBarComponent;
