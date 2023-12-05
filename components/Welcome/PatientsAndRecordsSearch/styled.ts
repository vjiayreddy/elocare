import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledFindPatientRecordsBox = styled(Box)(() => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop:100,
  "& .main_section": {
    width: 600,
  },
  "& .MuiTypography-h2": {
    lineHeight: "44px",
    marginBottom: 40,
  },
  "& .MuiTypography-h6": {
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.5,
    marginTop: 40,
    marginBottom: 20,
  },
  "& .MuiButton-root": {
    borderRadius: 5,
  },
}));
