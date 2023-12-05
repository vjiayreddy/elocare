import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";

export const StyledProgressBarWrapper = styled(Box)({
  position: "relative",
  minHeight: 20,
  width: "100%",
  "& .__count": {
    position: "absolute",
    top: "10%",
    left: "5%",
  },
});

export const StyledFavoritesListBox = styled(Box)(() => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  paddingTop: 40,
  alignItems: "center",
  "& .main_section": {
    width: 1000,
  },
  "& .MuiButton-root": {
    borderRadius: 5,
  },
  "& .__progress_wrapper": {
    position: "relative",
    "& span": {
      position: "absolute",
      top: 5,
      left: 0,
    },
  },
}));
