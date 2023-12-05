import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledAutocompleteSearchComponent = styled(Box)(({ theme }) => ({
  "& .MuiInputBase-root": {
    border: `1px solid ${theme.palette.divider}`,
    height: 40,
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 20,
    "& .MuiInputBase-input": {
      paddingLeft: 10,
    },
  },
}));
