import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface BackLableButtonComponentProps extends ButtonProps {
  title: string;
}

const BackLableButtonComponent = ({
  title,
  ...props
}: BackLableButtonComponentProps) => {
  return (
    <Button
      startIcon={<img alt="arrow_left" src="/icons/arrow-left.svg" />}
      color="inherit"
      variant="text"
      {...props}
    >
      {title}
    </Button>
  );
};

export default BackLableButtonComponent;
