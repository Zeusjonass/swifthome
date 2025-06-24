"use client"
// import { useState, useEffect } from 'react';
// import { Box, Button, Grid, Typography } from "@mui/material";
// import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import { TypeAnimation } from 'react-type-animation';

// import { useRouter } from 'next/navigation';
// import LottieAnimation from '@/src/swifthome/components/LottieAnimation';

// import littleRobotAnimation from '@/src/swifthome/media/little-robot.json';
// import PlansBanner from '@/src/swifthome/components/plans/PlansBanner';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

const LoginPage = () => {
  // const { user } = useAuthenticator((context) => [context.user]);
  // const navigate = useRouter();

  // useEffect(() => {
  //   if (user?.userId !== undefined) {
  //     navigate.push('/chat');
  //   }
  // }, [user, navigate]);

  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {/* <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundImage: `url('/hero-key.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          p: 3,
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />


        <Box sx={{ zIndex: 2, position: 'relative' }}>
          <Typography
            component="small"
            sx={{
              fontFamily: "var(--text-font)",
              fontSize: "1.2rem",
              opacity: ".85",
              display: 'block',
            }}
          >
            Sistema de gestión de búsqueda IA.
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "var(--title-font)",
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              my: 2,
            }}
          >
            Descubre tu
            <TypeAnimation
              sequence={[
                "Terreno(s)",
                2500,
                "Vivienda",
                2500,
                "Inmueble",
                2500,
                "Lote",
                2500,
              ]}
              speed={5}
              style={{
                fontSize: "1em",
                color: "#B0E9FD",
                marginLeft: "1rem",
              }}
              repeat={Infinity}
            />
            <br />
            para tu
            <TypeAnimation
              sequence={[
                "Ampliación",
                2500,
                " Familia",
                2500,
                " Armonía",
                2500,
                "Idea",
                2500,
              ]}
              speed={5}
              style={{
                fontSize: "1em",
                color: "#B0E9FD",
                marginLeft: "1rem",
              }}
              repeat={Infinity}
            />
            .
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              mt: 2,
              mb: 4,
              fontFamily: "var(--text-font)",
              fontWeight: "400",
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Explora un nuevo estándar en la búsqueda de propiedades.
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              zIndex: "2",
              fontFamily: "var(--text-font)",
              fontWeight: "700",
              backgroundColor: "#0957A0",
              color: "white",
              border: "2px solid #B0E9FD",
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: "#B0E9FD",
                color: '#0957A0',
              },
            }}
          >
            Inicia sesión
          </Button>
        </Box>
      </Box>

      <BootstrapDialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
    
            <Authenticator initialState="signIn" hideSignUp>
            {({ signOut, user }) => {

                return user ? (
                <Box sx={{color: 'white'}}>Redirigiendo...</Box>
                ) : <></>;
            }}
            </Authenticator>
        </DialogContent>
      </BootstrapDialog>

      <Box
        id="plans"
        sx={{
          backgroundColor: "rgba(218, 230, 229, 1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlansBanner />
      </Box>
      <LottieAnimation
        className="lottie"
        animationData={littleRobotAnimation}
        style={{
          width: "15vw",
          height: "15vh",
          position: "fixed",
          right: "0",
          bottom: "5%",
          zIndex: 99,
        }}
      /> */}
    </>
  );
};

export default LoginPage;
