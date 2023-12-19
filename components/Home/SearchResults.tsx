import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

interface StyledSearchResultsComponentProps {
  count: string | number;
}

const SearchResultsComponent = ({
  count,
}: StyledSearchResultsComponentProps) => {
  return (
    <Box mt={4} mb={1}>
      <Typography variant="subtitle1">Search Results</Typography>
      <Typography variant="body2">
        Total <b>{count}</b> Users
      </Typography>
    </Box>
  );
};

export default SearchResultsComponent;
