"use client";
import AppNavigationComponent from "@/components/Common/AppNavigation/AppNavigation";
import { APP_ROUTES } from "@/routes";
import { AUTH_STATUS } from "@/utils/constants";
import Container from "@mui/material/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface MainLayoutComponentProps {
  children: React.ReactNode;
}

const StyledMainLayoutComponent = styled(Box)(({ theme }) => ({
  "& .__layout_header": {
    minHeight: 100,
  },
  "& .__layout__content": {
    flexGrow: 1,
    position: "relative",
  },
  "& .__loading__indication": {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
}));

const MainLayoutComponent = ({ children }: MainLayoutComponentProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === AUTH_STATUS.LOADING && !session) {
    return <div />;
  }

  if (status === AUTH_STATUS.UNAUTHENTICATED && !session) {
    router.push(APP_ROUTES.LOGIN);
  }

  return (
    <Fragment>
      <AppNavigationComponent />
      <StyledMainLayoutComponent>{children}</StyledMainLayoutComponent>
    </Fragment>
  );
};

export default MainLayoutComponent;
