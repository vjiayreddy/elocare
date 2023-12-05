import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledSearchInputComponent = styled(Box)(({ theme }) => ({
  "& .MuiInputBase-root": {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    "& .MuiInputBase-input": {
      paddingLeft: 10,
    },
  },
}));
