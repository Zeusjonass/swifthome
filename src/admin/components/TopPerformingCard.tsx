"use client"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CartBadge } from "./ui";

interface TopPerformingCardProps {
  title: string;
  image: string;
  rateGlobal: number;
}

export const TopPerformingCard = ({ title, image, rateGlobal }: TopPerformingCardProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: "100%",
        border: "2px solid #D4D4D4",
        borderRadius: "20px",
        p: "6px",
        mt: "16px",
        textAlign: isSmallScreen ? "center" : "left",
        height: "100%",
        minHeight: isSmallScreen ? "140px" : "",
      }}
    >
      {/* Imagen y Nombre */}
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems="center"
      >
        <Box
          sx={{
            maxWidth: "89px",
            maxHeight: "63px",
            width: "100%",
            height: "63px",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: isSmallScreen ? "0px" : "16px",
            mb: isSmallScreen ? "8px" : "0px",
            aspectRatio: "89 / 63",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ borderRadius: "16px", width: '100%', height: '100%' }}
            onError={(e) =>
              (e.currentTarget.src = "/placeholder-image-min.png")
            }
          />
        </Box>
        <Typography>{title}</Typography>
      </Box>

      {/* rateGlobal */}
      <Box
        display="flex"
        alignItems="center"
        sx={{ width: "30px", mr: isSmallScreen ? "0px" : "30px" }}
      >
        <img src="/VectorStars.svg" style={{ transform: "scale(1.5)" }} />
        <CartBadge
          badgeContent={rateGlobal.toFixed(0)}
          overlap="circular"
          sx={{ fontWeight: "600" }}
        />
      </Box>
    </Box>
  );
}
