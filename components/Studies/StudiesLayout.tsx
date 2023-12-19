import { APP_BAR_SIZE } from "@/utils/constants";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

interface StudiesLayoutComponentProps {
  children: React.ReactNode;
}

const StyledMainBoxContent = styled(Box)(({ theme }) => ({
  height: `calc(100vh - ${APP_BAR_SIZE}px)`,
  display: "flex",
  flexDirection: "column",
  "& .__section_header": {
    height: "auto",
    marginTop: 30,
  },
  "& .__section_content": {
    flexGrow: 1,
    overflow: "auto",
  },
}));

const StudiesLayoutComponent = ({ children }: StudiesLayoutComponentProps) => {
  return <StyledMainBoxContent>{children}</StyledMainBoxContent>;
};

export default StudiesLayoutComponent;
