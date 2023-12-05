import { AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAppBarComponent = styled(AppBar)(({ theme }) => ({
  "& .__app_logo": {
    marginRight:40,
    marginTop:5
  },
  "& .__app_menu": {
    marginRight:40
  },
  "& .__app_search_bar": {
    flexGrow:1,
    marginRight:30,
  },
  "& .__app_user_actions": {},
}));
