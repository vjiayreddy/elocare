import React from "react";
import Button from "@mui/material/Button";

const BackLableButtonComponent = () => {
  return (
    <Button
      startIcon={<img alt="arrow_left" src="/icons/arrow-left.svg" />}
      color="inherit"
      variant="text"
    >
      Back to Assessment Gallery
    </Button>
  );
};

export default BackLableButtonComponent;
