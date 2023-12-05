"use client";
import AppNavigationComponent from "@/components/Common/AppNavigation/AppNavigation";
import { APP_ROUTES } from "@/routes";
import { AUTH_STATUS } from "@/utils/constants";
import Container from "@mui/material/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";

interface MainLayoutComponentProps {
  children: React.ReactNode;
}

const StyledMainLayoutComponrnt = styled(Container)(({ theme }) => ({
  "& .__layout_header": {
    minHeight: 100,
  },
  "& .__layout__content": {
    flexGrow: 1,
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
      <StyledMainLayoutComponrnt disableGutters maxWidth="lg">
        {children}
      </StyledMainLayoutComponrnt>
    </Fragment>
  );
};

export default MainLayoutComponent;
