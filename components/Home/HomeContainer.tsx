import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { APP_BAR_SIZE } from "@/utils/constants";

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

interface HomeLayoutComponentProps {
  children: React.ReactNode;
}

const HomeContainerComponent = ({ children }: HomeLayoutComponentProps) => {
  return <StyledMainBoxContent>{children}</StyledMainBoxContent>;
};

export default HomeContainerComponent;
