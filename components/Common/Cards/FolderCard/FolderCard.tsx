import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Box,
  Grid,
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
import { APP_ROUTES } from "@/utils/constants";
import { useDeleteFolderMutation } from "@/redux/api/studiesApi";
import AlerDialogComponent from "../../Dialogs/AlertDialog/AlertDialog";
import LoadingButtonComponent from "../../Buttons/LoadingButton";

interface FolderCardComponentProps {
  folderId: string;
  title: string;
  iconType: "FOLDER" | "STUDY" | string;
  status: string;
  onRenameFolder: () => void;
}

const StyledFolderCardComponent = styled(Card)(({ theme }) => ({
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  "& .MuiCardContent-root:last-child": {
    paddingBottom: 10,
  },
}));

const FolderCardComponent = ({
  title,
  iconType = "FOLDER",
  status,
  folderId,
  onRenameFolder,
}: FolderCardComponentProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [deleteFolder, { isLoading }] = useDeleteFolderMutation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = () => {
    router.push(`${APP_ROUTES.STUDIES}/${folderId}`);
  };

  const handleDeleteFolder = () => {
    deleteFolder({
      folderId: folderId,
    })
      .then(() => {
        setIsDeleted(false);
      })
      .catch((error) => {
        setIsDeleted(false);
      });
  };
  return (
    <StyledFolderCardComponent elevation={0}>
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
        <MenuItem onClick={handleNavigation}>View All Studies</MenuItem>
        <MenuItem
          onClick={() => {
            onRenameFolder();
            handleClose();
          }}
        >
          Rename Folder
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleted(true);
          }}
        >
          Delete Folder
        </MenuItem>
      </Menu>
      {isDeleted && (
        <AlerDialogComponent
          open={isDeleted}
          onClickCloseIcon={() => { }}
          footer={
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <LoadingButtonComponent
                    onClick={() => {
                      setIsDeleted(false);
                    }}
                    btnProps={{
                      fullWidth: true,
                      color: "inherit",
                      variant: "outlined",
                    }}
                  >
                    Cancel
                  </LoadingButtonComponent>
                </Grid>
                <Grid item md={6}>
                  <LoadingButtonComponent
                    showLoading={isLoading}
                    onClick={handleDeleteFolder}
                    btnProps={{
                      fullWidth: true,
                      disabled: isLoading,
                    }}
                  >
                    Yes, Remove
                  </LoadingButtonComponent>
                </Grid>
              </Grid>
            </Box>
          }
        >
          <Box mt={6}>
            <Typography variant="h6" textAlign="center" typography="">
              Are you sure want to delete {title} ?
            </Typography>
          </Box>
        </AlerDialogComponent>
      )}
    </StyledFolderCardComponent>
  );
};

export default FolderCardComponent;
