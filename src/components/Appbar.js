import { Box, AppBar, IconButton, Toolbar, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../contexts/AuthContext";

const AppBarComponent = ({ onMenuClick }) => {
  const { logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#017d84" }}>
        <Toolbar>
          <IconButton edge="start" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={logout} sx={{ color: "#98E1DA" }}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarComponent;
