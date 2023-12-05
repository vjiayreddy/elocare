import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledHomeLayout = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: "red",
}));

interface HomeLayoutComponentProps {
  children: React.ReactNode;
}

const HomeLayoutComponent = ({ children }: HomeLayoutComponentProps) => {
  return <StyledHomeLayout>{children}</StyledHomeLayout>;
};

export default HomeLayoutComponent;
