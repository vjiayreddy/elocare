"use client";
import LoginFormComponent from "@/components/Login/Form";
import { Box, styled } from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AUTH_STATUS } from "@/utils/constants";
import { APP_ROUTES } from "@/routes";

const StyledLoginPage = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === AUTH_STATUS.LOADING && !session) {
    return <div />;
  }

  if (status === AUTH_STATUS.AUTHENTICATED && session) {
    router.push(APP_ROUTES.HOME);
  }

  return (
    <StyledLoginPage>
      <LoginFormComponent />
    </StyledLoginPage>
  );
};

export default LoginPage;
