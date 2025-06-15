"use client"
import { Box, Button, Link } from '@mui/material';
import LogoDeux from '../images/logo_deux.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';
import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from 'react-query';
import { deleteThreadAndFile } from '../api/api-gateway/assistantFile';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import TooltipContent from './header/TooltipContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import React from 'react';
import { useRouter } from 'next/navigation';

const CustomTooltip = styled(
  React.forwardRef<HTMLDivElement, TooltipProps>(({ className, ...props }, ref) => (
    <Tooltip {...props} classes={{ popper: className }} ref={ref} />
  ))
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1F272D',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 750,
    boxShadow: '0px 3px 20px rgba(255, 185, 69, 0.35)',
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
    marginTop: '1rem',
  },
}));

const NavLink = styled('a')(({ theme }) => ({
  color: '#E0E0E0',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'color 0.3s ease-out',
  padding: '0.5rem 0',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    display: 'block',
    marginTop: '5px',
    right: '0',
    background: '#B0E9FD',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: '#FFFFFF',
  },
  '&:hover:after': {
    width: '100%',
    left: '0',
    background: '#B0E9FD',
  },
}));

const MenuButton = styled('button')({
  background: 'none',
  border: '0',
  outline: '0',
  color: '#fff',
  cursor: 'pointer',
  display: 'none',
  borderRadius: '8px',
  padding: '8px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  "@media (max-width: 768px)": {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const BtnCloseMenu = styled(MenuButton)<{ menu: boolean }>(({ menu }) => ({
  fontSize: '2rem',
  position: 'fixed',
  top: '1.25rem',
  right: '1.25rem',
  zIndex: 1100,
  transform: menu ? 'translate(0)' : 'translateX(150%)',
  transition: 'transform .4s ease-out',
}));

const BtnOpenMenu = styled(MenuButton)<{ menu: boolean }>({});

const NavList = styled('div')<{ menu: boolean }>(({ menu }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2.5rem',
  "@media (max-width: 768px)": {
    position: 'fixed',
    top: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5rem',
    width: 'min(75vw, 400px)',
    height: '100vh',
    backgroundColor: 'rgba(22, 39, 59, 0.85)',
    backdropFilter: 'blur(10px)',
    borderLeft: '1px solid rgba(136, 146, 176, 0.2)',
    transform: menu ? 'translate(0)' : 'translateX(100%)',
    transition: 'transform .4s ease-out',
    zIndex: 1000,
  }
}));

const Header = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useRouter();

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
    navigate.push('/login');
  };

  const [menu, setMenu] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  const NavButton = styled(Button)({
    color: '#fff',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#B0E9FD',
    },
  });

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'rgba(22, 39, 59, 0.7)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box sx={{
        width: '100%',
        maxWidth: '1440px',
        padding: { xs: '1rem 1.5rem', md: '1rem 4rem' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        <Link href="/">
          <img src={LogoDeux.src} style={{ width: '7rem', display: 'block' }} alt="logo" />
        </Link>

        <NavList menu={menu}>
          <BtnCloseMenu menu={menu} onClick={() => setMenu(false)}>
            <CloseIcon />
          </BtnCloseMenu>
          
          { !user && (<NavLink href="#plans" onClick={() => setMenu(false)}>Precio</NavLink>)}
           
          <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
            <div>
              <CustomTooltip 
                title={<TooltipContent/>} 
                arrow
                disableFocusListener
                onClose={() => setOpenTooltip(false)}
                open={openTooltip}
                disableHoverListener
                disableTouchListener
              >
                <NavLink href="#" onClick={(e) => {
                  e.preventDefault();
                  setOpenTooltip((prev) => !prev); 
                }}>
                  ¿Cómo funciona?
                </NavLink>
              </CustomTooltip>
            </div>
          </ClickAwayListener>

          {user ? (
            <NavButton
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleSignOut}
            >
              Cerrar Sesión
            </NavButton>
          ) : (
            <NavButton
              variant="outlined"
              onClick={() => {
                navigate.push('#contact');
                setMenu(false);
              }}
            >
              Contacto
            </NavButton>
          )}
        </NavList>

        <BtnOpenMenu menu={menu} onClick={() => setMenu(true)}>
          <MenuIcon sx={{ fontSize: '2rem' }} />
        </BtnOpenMenu>
      </Box>
    </Box>
  );
};
export default Header;
