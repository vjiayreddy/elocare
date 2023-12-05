"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/material/styles";
import _ from "lodash";

const StyledListComponent = styled(List)(({ theme }) => ({
  width: 300,
  maxWidth: 300,
  backgroundColor: theme.palette.common.white,
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 400,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  "& ul": { padding: 0 },
  "& .MuiListSubheader-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
  },
  "& .MuiListItem-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface QuestionListComponentProps {
  questionData: any[];
}

const QuestionListComponent = ({
  questionData,
}: QuestionListComponentProps) => {
  return (
    <StyledListComponent sx={{}} subheader={<li />}>
      <li>
        <ul>
          <ListSubheader>Questions</ListSubheader>
          {questionData.map((item, index) => (
            <ListItem key={`item-${index}`}>
              <ListItemText
                primary={!_.isEmpty(item?.title) ? item.title : item.value}
                secondary={item.subTitle}
              />
            </ListItem>
          ))}
        </ul>
      </li>
    </StyledListComponent>
  );
};

export default QuestionListComponent;
