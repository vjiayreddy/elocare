import React, { ReactNode } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { BeatLoader } from "react-spinners";
import { APP_COLORS } from "@/theme/colors";

interface LoadingButtonComponentProps {
  btnProps?: ButtonProps;
  onClick: () => void;
  children: string | ReactNode;
  showLoading?: boolean;
  beatLoaderProps?: {
    dotsSize?: number;
    margin?: number;
    color?: string;
    loading?: boolean;
    speedMultiplier?: number;
  };
}

const LoadingButtonComponent = ({
  children,
  btnProps,
  showLoading,
  beatLoaderProps,
  onClick
}: LoadingButtonComponentProps) => {
  return (
    <Button onClick={onClick} {...btnProps}>
      {showLoading ? (
        <BeatLoader color={APP_COLORS?.WHITE} {...beatLoaderProps} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default LoadingButtonComponent;
