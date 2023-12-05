import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

const StyledDialogContent = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 400,
  minHeight: 250,
  display: "flex",
  flexDirection: "column",
  "& .__model__header": {
    position:"absolute",
    top:10,
    right:10,
  },
  "& .__content": {
    padding: `20px 20px`,
    flexGrow: 1,
    overflow: "auto",
  },
  "& .__model__footer": {
    minHeight: 50,
    height: "auto",
    padding: `10px 20px`,
  },
}));

interface ClosedDialogComponentProps extends DialogProps {
  onClickCloseIcon: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  modelTitle?: string;
}

const AlerDialogComponent = ({
  onClickCloseIcon,
  children,
  modelTitle,
  footer,
  ...props
}: ClosedDialogComponentProps) => {
  return (
    <Dialog {...props}>
      <StyledDialogContent>
        <Box component="div" className="__model__header">
          <IconButton onClick={onClickCloseIcon}>
            <img alt="close_icon" src="/icons/x-close.svg" />
          </IconButton>
        </Box>
        <Box component="div" className="__content">
          {children}
        </Box>
        {footer && (
          <Box component="div" className="__model__footer">
            {footer}
          </Box>
        )}
      </StyledDialogContent>
    </Dialog>
  );
};

export default AlerDialogComponent;
