"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ArrowCircleRightOutlined, DashboardOutlined, EditOutlined, MapsHomeWorkOutlined, QuestionAnswerOutlined, SettingsOutlined, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { signOut } from "aws-amplify/auth";
import { useMutation } from "react-query";
import { deleteThreadAndFile } from "@/src/swifthome/api/api-gateway/assistantFile";
import { useRouter } from "next/navigation";

interface SideBarProps {
  drawerWidth: number;
  headerHeight: number;
}

export const SideBar = ({ drawerWidth, headerHeight }: SideBarProps) => {
  const theme = useTheme();
  const location = usePathname()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCollapsed, setIsCollapsed] = useState(isSmallScreen);
  const navigate = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (isSmallScreen) {
      setIsCollapsed(true);
    }
  }, [isSmallScreen]);

  const deleteFileMutation = useMutation(deleteThreadAndFile, {
    onSuccess: () => {
      localStorage.removeItem('threadAndFileId');
    },
    onError: (error) => {
      console.error("Error removing assistant file", error);
    }
  });

  const handleSignOut = async () => {
    const threadAndFileId = localStorage.getItem('threadAndFileId');
    if (threadAndFileId) {
      await deleteFileMutation.mutateAsync(threadAndFileId);
    }
    signOut();
    navigate.push('/');
  };

  const dataItems = [
    { icon: <DashboardOutlined />, text: "Dashboard", path: "/admin" },
    { icon: <QuestionAnswerOutlined />, text: "Preguntas", path: "/admin/questions" },
    { icon: <MapsHomeWorkOutlined />, text: "Propiedades", path: "/admin/properties" },
    { icon: <EditOutlined />, text: "Editar perfil", path: "/admin/edit-profile" },
    { icon: <SettingsOutlined />, text: "Configuración", path: "/admin/settings" },
  ];

  return (
    <>
      {isSmallScreen && (
        <Box
          sx={{
            position: "fixed",
            top: headerHeight + 12,
            zIndex: isCollapsed ? 1201 : 1000,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "55px",
            height: "48px",
            backgroundColor: theme.palette.tertiary.main,
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            cursor: "pointer",
            boxShadow: theme.shadows[3],
            animation: "slideIn 0.5s ease-out",
            "@keyframes slideIn": {
              "0%": { transform: "translateX(-40px)", opacity: 0 },
              "100%": { transform: "translateX(0)", opacity: 1 },
            },
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute",
              left: 6,
              width: 48,
              height: 48,
              "&:hover": {
                backgroundColor: theme.palette.tertiary.light,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}


      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? !isCollapsed : true}
        onClose={toggleSidebar}
        sx={{
          width: isCollapsed ? 60 : drawerWidth,
          flexShrink: 0,
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 60 : drawerWidth,
            transition: "width 0.3s",
            boxSizing: "border-box",
            position: isSmallScreen ? "absolute" : "relative",
            height: "100%",
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 2,
            top: isSmallScreen ? `${headerHeight}px` : "",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: `${isCollapsed ? "center" : "flex-end"}`,
            paddingX: 1,
          }}
        >
          <IconButton onClick={toggleSidebar}>
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        <List
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
          onClick={isSmallScreen ? toggleSidebar : undefined}
        >
          {dataItems.map((item, index) => (
            <Link key={index} href={item.path} style={{width: '100%', textDecoration: 'none'}} passHref>
              <ListItem
                sx={{
                  width: "100%",
                  backgroundColor:
                    location === item.path
                      ? "primary.main"
                      : "secondary.main",
                  color: location === item.path ? "#fff" : "#000",
                  borderRadius: "80px",
                  marginBottom: 1.5,
                  paddingY: 1.5,
                  paddingX: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  "&:hover": {
                    backgroundColor:
                      location === item.path
                        ? "primary.main"
                        : "#E0E0E0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color:
                      location === item.path
                        ? "#fff"
                        : "iconColor.main",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.text} />}
              </ListItem>
            </Link>
          ))}
        </List>

        {/* Botón de Logout */}
        <Box sx={{ width: "80%" }}>
          <ListItem
            onClick={handleSignOut}
            sx={{
              width: "100%",
              border: "1px solid #E0E0E0",
              borderRadius: "80px",
              paddingY: 1.5,
              paddingX: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "space-between",
              "&:hover": {
                backgroundColor: "#E0E0E0",
              },
            }}
          >
            {!isCollapsed && <ListItemText primary="Cerrar sesión" />}
            <ListItemIcon
              sx={{
                minWidth: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrowCircleRightOutlined />
            </ListItemIcon>
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};
