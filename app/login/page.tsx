"use client"
import { useState, useEffect } from 'react';
import { Box, Button, Grid } from "@mui/material";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TypeAnimation } from 'react-type-animation';
import backgroundImage from '@/src/swifthome/images/merida.jpg';
import { useRouter } from 'next/navigation';
import LottieAnimation from '@/src/swifthome/components/LottieAnimation';
import houseABCDEFAnimation from '@/src/swifthome/media/house-abcdef.json';
import littleRobotAnimation from '@/src/swifthome/media/little-robot.json';
import PlansBanner from '@/src/swifthome/components/plans/PlansBanner';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const LoginPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useRouter();

  useEffect(() => {
    if (user?.userId !== undefined) {
      navigate.push('/chat');
    }
  }, [user, navigate]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/initParticles.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <>
      <Grid
        container
        className="authenticator-container"
        id="particles-js"
        sx={{background: 'blue'}}
        style={{  
          maxHeight: "100%",
          width: "100%",
          display: "flex",
          zIndex: -1,
        }}
      >
        <Grid
          sx={{
            gridColumn: {
              xs: "span 10",
              sm: "span 10",
              md: "span 7",
              lg: "span 6",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              overflow: "hidden",
            }}
            id="text-container"
          >
            <small
              style={{
                backgroundColor: "none",
                color: "#D9E0E7",
                fontFamily: "var(--text-font)",
                fontSize: "1.2rem",
                opacity: ".75",
              }}
            >
              Sistema de gestión de búsqueda IA.
            </small>
            <h1
              style={{
                backgroundColor: "none",
                color: "white",
                fontFamily: "var(--title-font)",
                fontSize: "4rem",
                textWrap: "nowrap",
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
                  color: "#0957A0",
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
                  color: "#0957A0",
                  marginLeft: "1rem",
                }}
                repeat={Infinity}
              />
              .
            </h1>
            <h3
              style={{
                marginTop: "0",
                backgroundColor: "none",
                color: "white",
                fontFamily: "var(--text-font)",
                fontSize: "1.5rem",
                fontWeight: "400",
              }}
            >
              Explora un nuevo estándar en la búsqueda de propiedades.
            </h3>
            <>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                style={{
                  zIndex: "2",
                  fontFamily: "var(--text-font)",
                  fontWeight: "700",
                  backgroundColor: "#16273B",
                  color: "#B0E9FD",
                  border: "none",
                }}
              >
                Inicia sesión
              </Button>
              <BootstrapDialog
                fullWidth
                maxWidth="xl"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <DialogContent
                  style={{
                    width: "fit-content",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                >
                  <div
                    className="overlay"
                    style={{
                      backgroundColor: "black",
                      opacity: ".7",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  ></div>
                    <Authenticator initialState="signIn" hideSignUp>
                    {({ signOut, user }) => {
                        // Redirección programática
                        useEffect(() => {
                        if (user) {
                            navigate.push('/chat');
                        }
                        }, [user, navigate]);

                        return user ? (
                        <Box>Redirigiendo...</Box>
                        ) : (
                        <Box>Por favor, inicia sesión.</Box>
                        );
                    }}
                    </Authenticator>
                </DialogContent>
              </BootstrapDialog>
            </>
          </Box>
        </Grid>
        <Grid
          sx={{
            gridColumn: {
              xs: "span 6",
              sm: "span 8",
              md: "span 5",
              lg: "span 6",
            },
          }}>
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <LottieAnimation
              animationData={houseABCDEFAnimation}
              style={{
                width: "70%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
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
          zIndex: 0,
        }}
      />
    </>
  );
};

export default LoginPage;
