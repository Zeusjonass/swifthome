import { AppBar, Toolbar, Box, IconButton, Avatar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

export const Header = ({headerHeight}: {headerHeight: number}) => {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <AppBar position="sticky" sx={{ height: `${headerHeight}px`, boxShadow: 'none', borderBottom: '2px solid #E2E1E1', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ backgroundColor: 'white', height: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/chat" style={{display: 'inline-block'}}>
            <Image src="/fostwjj399sm1ozl1e9-1-2.png.webp" alt="Logo" width={200} height={47.72} />
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" >
            <NotificationsIcon fontSize="medium" sx={{ color: 'action.active'}} />
          </IconButton>
          <Avatar alt={user.username} src="/" sx={{ width: 30, height: 30, mx: '8px' }} />
          <Typography variant="body1" sx={{ color: "black", fontSize: 'small' }}>
            {user.username}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
