import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes";

interface StudyCardComponentProps {
  title: string;
  iconType: "FOLDER" | "STUDY" | string;
  status: string;
  label: string;
  id: string;
  onRenameFolder: () => void;
}

const StyledStudyCardComponent = styled(Card)(({ theme }) => ({
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  "& .MuiCardContent-root:last-child": {
    paddingBottom: 10,
  },
}));

const StudyCardComponent = ({
  title,
  iconType = "FOLDER",
  status,
  id,
  onRenameFolder,
}: StudyCardComponentProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewStudy = () => {
    handleClose();
    router.push(`${APP_ROUTES.All_STUDIES}/${id}`);
  };

  return (
    <StyledStudyCardComponent elevation={0}>
      <CardContent sx={{ padding: "10px" }}>
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton
              onClick={handleClick}
              sx={{ padding: 0 }}
              edge="end"
              aria-label="more"
            >
              <img alt="more" src={"/icons/more.svg"} />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "transparent" }}>
              <img
                alt="folder"
                src={
                  iconType === "FOLDER"
                    ? "/icons/folder.svg"
                    : "/icons/study.svg"
                }
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography pr={3} noWrap fontWeight={600} variant="subtitle1">
                {title}
              </Typography>
            }
            secondary={status}
          />
        </ListItem>
      </CardContent>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleViewStudy}>View</MenuItem>
        <MenuItem onClick={onRenameFolder}>Rename</MenuItem>
        <MenuItem
          onClick={() => {
            // handleDeleteProtocol(data?._id);
            // handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </StyledStudyCardComponent>
  );
};

export default StudyCardComponent;
