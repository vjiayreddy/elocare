import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

interface UserAvatarWithLabelProps {
  authorImage?: string;
  authorName: string;
}

const UserAvatarWithLabel = ({
  authorName,
  authorImage,
}: UserAvatarWithLabelProps) => {
  return (
    <Grid container alignItems="center" columnSpacing={2}>
      <Grid item>
        <Avatar
          sx={{ height: 24, width: 24 }}
          alt={authorName}
          src={authorImage}
        />
      </Grid>
      <Grid item xs>
        <Typography
          sx={(theme) => ({
            color: theme?.palette.text.secondary,
          })}
          noWrap
          variant="body1"
        >
          {authorName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserAvatarWithLabel;
