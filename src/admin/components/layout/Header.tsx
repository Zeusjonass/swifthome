import { AppBar, Toolbar, Box, IconButton, Avatar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const Header = ({headerHeight}: {headerHeight: number}) => {
  //TODO: Cambiar a Link y path
  return (
    <AppBar position="sticky" sx={{ height: `${headerHeight}px`, boxShadow: 'none', borderBottom: '2px solid #E2E1E1', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ backgroundColor: 'white', height: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <a href="#" style={{display: 'inline-block'}}>
            <img src="/fostwjj399sm1ozl1e9-1-2.png.webp" alt="Logo" style={{width: '200px'}}/>
          </a>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" >
            <NotificationsIcon fontSize="medium" sx={{ color: 'action.active'}} />
          </IconButton>
          <Avatar alt="User" src="/" sx={{ width: 30, height: 30, mr: '8px' }} />
          <Typography variant="body1" sx={{ color: "black", fontSize: 'small' }}>
            User name
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
