"use client";
import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const StyledStudiesListComponent = styled(Box)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    width: "90%",
    fontSize: 16,
  },
  "& .__counter_box": {
    minWidth: 30,
    minHeight: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 100,
    border: `1px solid ${theme.palette.divider}`,
    padding: 5,
  },
}));

type listItemType = {
  title: string;
  count: number | string;
};

interface ConditionalListComponentProps {
  listTitle: string;
  listItems: listItemType[];
  showListCounter?: boolean;
}

const ConditionalListComponent = ({
  listItems,
  listTitle,
  showListCounter = false,
}: ConditionalListComponentProps) => {
  return (
    <StyledStudiesListComponent>
      <Box mb={2}>
        <Grid container>
          <Grid item xs>
            <Typography variant="subtitle1">{listTitle}</Typography>
          </Grid>
        </Grid>
      </Box>
      <List disablePadding component="nav" sx={{ width: "100%" }}>
        {listItems?.map((item: any, index) => {
          return (
            <ListItemButton key={index} disableGutters>
              <ListItemText primary={item?.title} />
              {showListCounter && (
                <Box component="div" className="__counter_box">
                  <Typography variant="body2">
                    {item?.assessmentTemplates?.[0]?.length}
                  </Typography>
                </Box>
              )}
            </ListItemButton>
          );
        })}
      </List>
    </StyledStudiesListComponent>
  );
};

export default ConditionalListComponent;
