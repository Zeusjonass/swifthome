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

const BtnHeaderContactUs = styled('a')(() => ({
  backgroundColor: '#0A6FC0',
  borderRadius: '0.125rem',
  paddingBlock: '0.75rem',
  paddingInline: '2.5rem',
  border: 0,
  outline: 0,
  fontSize: '1rem',
  color: '#fff',
  textTransform: 'capitalize',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#095CA0',
    textDecoration: 'none',
    color:'#fff'
  },
}));

const NavLink = styled('a')(() => ({
  marginTop: 0,
  color: '#fff',
  fontWeight: 400,
  textDecoration: 'none',
  transition: 'all 0.5s ease-out',
  '&:hover': {
    color: '#B0E9FD',
  },
}));

const BtnCloseMenu = styled('button')<{ menu: boolean }>(({menu})=>({
  background: 'none',
	border: '0',
	outline: '0',
	fontSize: '2rem',
	color:'#fff',
	display: 'none',
  borderRadius: '12px',
  backgroundColor: '#1D3F5C',
  width: '2.5rem',
  padding: 0,
  boxShadow:'0px 1px 5px rgba(255, 185, 69, 0.35)',
  cursor:'pointer',

  "@media (max-width: 768px)":{
     display: 'block',
     position: 'fixed',
     top: '1.25rem',
     right: '1.25rem',
     transform: menu ? 'translate(0)': 'translateY(-100vw)',
     transition: 'transform .4s ease-out',
  }
}))

const BtnOpenMenu = styled('button')<{ menu: boolean }>(({menu})=>({
  outline: '0',
  color:'#fff',
  cursor: 'pointer',
  display: 'none',
  borderRadius: '12px',
  padding: '8px',
  border:'none',
  background: '#1D3F5C',
  boxSizing: 'border-box',
  boxShadow:'0px 1px 5px rgba(255, 185, 69, 0.35)',
  "@media (max-width: 768px)":{
     display: 'flex',
  }}))

const NavList = styled('div')<{ menu: boolean }>(({menu})=>({
  display:'flex',
  columnGap:'1.75rem',
  "@media (max-width: 768px)":{
    position:'fixed',
    top:'0',
    right:'0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
	  justifyContent: 'center',
	  rowGap: '2.5rem',
	  paddingBottom: '18rem',
	  width:' min(65vw, 400px)',
	  height: '100vh',
	  backgroundColor:'#16273B',
	  borderLeft: '1px solid rgba(136, 146, 176, .2)',
	  transform: menu ?'translate(0)':'translate(100vw)',
	  transition: 'transform .4s ease-out',
  }
}))

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
      console.log("file removed ", threadAndFileId)
    }
    signOut();
    navigate.push('/login');
  };

  const handleQuoteClick = () => {
    navigate.push('/login#plans');
  };

  const [menu, setMenu] = useState<boolean>(false)
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', bgcolor: '#16273B', position: 'relative', zIndex: '22' }}>
      <Box sx={{
        width: { xs: '90%', md: '100%' },
        paddingInline: { xs: '0', md: '6rem' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <img src={LogoDeux.src} style={{ width: '8rem' }} alt="logo" />
          </Link>
        </Box>
       
        <Box sx={{
            paddingBlock:{xs:'2rem',md:'1.75rem'},
            paddingInline:{xs:'0', md:'3.5rem'}, 
            position:'relative'}}>

          <NavList menu={menu}>
            { !user && (<NavLink href="#plans">Precio</NavLink> )}
           
          <ClickAwayListener onClickAway={()=>setOpenTooltip(false)}>
            <CustomTooltip 
              title={<TooltipContent/>} 
              arrow
              disableFocusListener
              onClose={()=>setOpenTooltip(false)}
              open={openTooltip}
              disableHoverListener
              disableTouchListener>
              <NavLink href="#" onClick={(e) => {
                e.preventDefault();
                setOpenTooltip((prev) => !prev); 
            }}>¿Cómo funciona?
              </NavLink>
            </CustomTooltip>
          </ClickAwayListener>
          </NavList>
        </Box>

        <BtnOpenMenu menu={menu} onClick={() => setMenu(true)}>
          <MenuIcon sx={{ fontSize: '2rem' }} />
        </BtnOpenMenu>

        <BtnCloseMenu menu={menu} onClick={() => setMenu(false)}>
          <CloseIcon />
        </BtnCloseMenu>

        <Box
          sx={{
            "@media (max-width: 768px)": {
              display: "flex",
              position: "fixed",
              bottom: "16rem",
              right: 0,
              width: "min(65vw, 400px)",
              justifyContent: "center",
              fontSize: "1.25rem",
              transform: menu ? "translate(0)" : "translate(100vw)",
              transition: "transform 0.4s ease-out",
              alignItems: "center",
            }}}>
          
          {/* Si el usuario ha iniciado sesion se renderiza el boton de cerrar sesion en caso contrario
            se renderiza el boton de contacto*/}
          {user ? (
            <Button sx={{ backgroundColor: "#0A6FC0", color: "#d9e0e7",
                          '&:hover': { backgroundColor: '#095CA0' }
          }}        startIcon={<LogoutIcon />} onClick={handleSignOut}/>) :
            
            <BtnHeaderContactUs href="#contact"> Contacto </BtnHeaderContactUs>
          }
        </Box>
      </Box>
    </Box>
  );
};
export default Header;
