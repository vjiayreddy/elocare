import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
export const StyledDropDownWithCheckBoxComponent = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .MuiPaper-root": {
    borderRadius: 2,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "& .MuiInputBase-root": {
    // border:`1px solid ${theme.palette.divider}`
  },
}));
