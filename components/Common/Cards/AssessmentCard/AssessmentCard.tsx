"use client";
import { Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import { SxProps, styled } from "@mui/material/styles";
import React from "react";

type AssessmentCardDateType = {
  index?: number;
  title: string;
};
export interface AssessmentCardComponentPops {
  data: AssessmentCardDateType;
  boxProps?: BoxProps;
  onClick?: () => void;
}

const StyledAssessmentCardComponent = styled(Box)(({ theme }) => ({
  minHeight: 160,
  height: "100%",
  border: `1px solid ${theme?.palette?.divider}`,
  borderRadius: 8,

  "& .__number_count": {
    width: 30,
    height: 30,
    backgroundColor: theme.palette.grey[300],
    borderRadius: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AssessmentCardComponent = ({
  data,
  boxProps,
  onClick,
}: AssessmentCardComponentPops) => {
  return (
    <StyledAssessmentCardComponent p={2} {...boxProps} onClick={onClick}>
      <Box component="div" className="__number_count">
        <Typography sx={{ fontSize: 12 }} variant="body1">
          {data?.index}
        </Typography>
      </Box>
      <Box mt={1.5}>
        <Typography variant="body1">{data?.title}</Typography>
      </Box>
    </StyledAssessmentCardComponent>
  );
};

export default AssessmentCardComponent;
