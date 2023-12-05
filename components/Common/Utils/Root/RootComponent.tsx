"use client";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { styled } from "@mui/material/styles";
import { APP_BAR_SIZE, AUTH_STATUS } from "@/utils/constants";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { APP_ROUTES } from "@/routes";

const StyledMainContainer = styled("main")(({ theme }) => ({
  minHeight: `calc(100vh)`,
  display: "flex",
  flexDirection: "column",
  paddingTop: `${APP_BAR_SIZE}px !important`,
}));

interface RootComponentProps {
  children: React.ReactNode;
}

const RootComponent = ({ children }: RootComponentProps) => {
  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <StyledMainContainer>{children}</StyledMainContainer>
    </Fragment>
  );
};

export default RootComponent;
