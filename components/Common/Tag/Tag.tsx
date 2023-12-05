import React from "react";
import Chip, { ChipProps } from "@mui/material/Chip";
import { styled } from "@mui/material";

interface TagComponentProps extends ChipProps { }

const StyledTagComponent = styled(Chip)(({ theme }) => ({
    borderRadius: 5,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`
}));

const TagComponent = ({ ...props }: TagComponentProps) => {
    return <StyledTagComponent {...props} />;
};

export default TagComponent;
