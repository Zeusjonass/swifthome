"use client"
import { useEffect, useRef, useState } from "react";
import { ArrowCircleRightOutlined, ArrowOutward, Place } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { CartBadge } from "./ui"
import { Property } from "../schemas";

interface ProjectReviewOpportunitiesCardProps {
  isSmallScreen: boolean;
  bestProperty: Property;
}
// Propiedad mejor evaluada
//btn -> visitar

export const ProjectReviewOpportunitiesCard = ({isSmallScreen, bestProperty}: ProjectReviewOpportunitiesCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(!isSmallScreen);

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const width = cardRef.current.clientWidth;
        setIsColumn(width < 335);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      ref={cardRef}
      sx={{
        border: "2px solid #D4D4D4",
        borderRadius: "20px",
        p: "16px",
        width: "100%",
        maxWidth: "600px",
        mx: "auto",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        sx={{ mb: 2, gap: isSmallScreen ? 1 : 0 }}
      >
        <Typography
          sx={{
            fontSize: "1.125rem",
            fontWeight: "600",
            width: isSmallScreen ? "100%" : "auto",
          }}
        >
          Propiedad Mejor Evaluada
        </Typography>
        <Box
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            borderRadius: "100%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { backgroundColor: "primary.light" },
          }}
        >
          <ArrowOutward />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isColumn ? "column" : "row",
          justifyContent: "space-between",
          gap: 2,
          height: "auto",
        }}
      >
        <Box
          sx={{
            width: isColumn ? "100%" : "33%",
            height: isColumn ? "150px" : "111px",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={bestProperty.image}
            alt={bestProperty.title}
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
          />
        </Box>
        <Box sx={{ width: isColumn  ? "100%" : "63%" }}>
          <Box
            sx={{
              mb: 2,
              pr: isColumn  ? 0 : "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: "600" }}>
                {bestProperty.title}
              </Typography>
              <Place fontSize="small" color="primary" />
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#484848",
                  display: "inline-block",
                }}
              >
                {bestProperty.location.length > 15 ? `${bestProperty.location.slice(0,15)}...` : bestProperty.location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ width: "30px" }}>
              <img
                src="/VectorStars.svg"
                style={{ transform: "scale(1.50)" }}
                alt="stars"
              />
              <CartBadge
                badgeContent={bestProperty.rateGlobal && bestProperty.rateGlobal.toFixed(0)}
                overlap="circular"
                sx={{ fontWeight: "600" }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            endIcon={<ArrowCircleRightOutlined />}
            fullWidth
            sx={{
              height: 41,
              textTransform: "none",
              borderRadius: "30px",
              fontSize: "1rem",
              justifyContent: "space-between",
              textWrap: 'nowrap'
            }}
          >
            Visitar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
