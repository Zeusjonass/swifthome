import { List, ListItem, ListItemText, Typography } from "@mui/material";

const TooltipContent = () => {
  return (
    <List
      sx={{
        listStyle: "none",
        padding:{xs:"1rem",md:"1.5rem"},
        width: "100%",
        "& li": {
          listStyle: "none",
          marginBottom: "0.4rem",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          color: "#D9E0E7",
        },
        "& li:before": {
          content: '"▶"',
          color: "#fff",
          fontSize: "0.7rem",
          marginTop: "8px",
          position: "absolute",
          left: 0,
        },
      }}>
      <ListItem component="li">
        <ListItemText
          sx={{paddingLeft:'0.5rem'}}
          disableTypography
          secondary={
            <Typography
              sx={{
                fontSize: { xs: "0.7rem", md: "1rem" },
                fontWeight: "300",
              }}>
              SwiftHome es una herramienta especializada para filtrar
              información apoyada por el motor de Open AI (Chat GPT).
            </Typography>
          } />
      </ListItem>
      <ListItem component="li">
        <ListItemText
          sx={{paddingLeft:'0.5rem'}}
          disableTypography
          secondary={
            <Typography
              sx={{
                fontSize: { xs: "0.7rem", md: "1rem" },
                fontWeight: "300",
              }}>
              Como asesor de búsqueda inmobiliaria, es tu propósito encontrar
              las propiedades que mejor se adapten a las necesidades del
              cliente; mientras que el propósito de SwiftHome es facilitarte
              esta tarea.
            </Typography>
          }/>
      </ListItem>
      <ListItem component="li">
        <ListItemText
          sx={{paddingLeft:'0.5rem'}}
          disableTypography
          secondary={
            <>
              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", md: "1rem" },
                  fontWeight: "300",
                  display: "inline",
                }}>
                Nuestro chat se personaliza usando tu catálogo de propiedades.
                Intenta preguntas como:
              </Typography>

              <Typography
                sx={{
                  fontWeight: "500",
                  display: "inline",
                  fontSize: { xs: "0.7rem", md: "1rem" },
                }}> 
                {" "}"¿Qué propiedades me recomendarías para una familia mediana?",
              </Typography>
              
              <Typography
                sx={{
                  fontWeight: "500",
                  display: "inline",
                  fontSize: { xs: "0.7rem", md: "1rem" },
                }}>
                {" "}"Recomiéndame 4 propiedades para una persona que...?",
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", md: "1rem" },
                  fontWeight: "300",
                  display:'inline',
                }}>
                etc. Recuerda que, al estar construido a partir de una
                tecnología en constante mejora, como lo es la IA hoy en día, el
                chat no se encuentra exento de fallas.
              </Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default TooltipContent;
