"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";
import UserAvatarWithLabel from "../../UserAvatarWithLabel/UserAvatarWithLabel";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes";

type TemplateCardDateType = {
  image?: string;
  title?: string;
  authorImage?: string;
  authorName?: string;
  totalTemplates?: string | number | null;
 
};
export interface TemplateCardComponentPops {
  data: TemplateCardDateType;
  onClick: () => void;
}

const StyledTemplateCardComponent = styled(Box)(({ theme }) => ({
  "& .__image_box": {
    width: "100%",
    minHeight: 170,
    maxHeight: 170,
    backgroundColor: theme.palette.grey[100],
    borderRadius: 8,
  },
}));

const TemplateCardComponent = ({ data,onClick }: TemplateCardComponentPops) => {
  const router = useRouter();
  return (
    <StyledTemplateCardComponent
      onClick={onClick}
    >
      <Box component="div" className="__image_box"></Box>
      <Box mt={1.5}>
        <Typography variant="body1" noWrap>
          {data?.title}
        </Typography>
      </Box>
      <Box mt={2} mb={2}>
        <UserAvatarWithLabel
          authorName={data?.authorName as string}
          authorImage={data?.authorImage}
        />
      </Box>
      {data?.totalTemplates && (
        <Chip
          variant="outlined"
          color="secondary"
          label={`${data?.totalTemplates} templates`}
        />
      )}
    </StyledTemplateCardComponent>
  );
};

export default TemplateCardComponent;
