"use client"
import { useState } from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { MapsHomeWorkOutlined, QuestionAnswer, RecommendOutlined } from "@mui/icons-material"
import { TopPerformingCard, StatCardContainer, OpportunitiesAndReviewsGrid, AddNewPropertyButton, NewPropertyDialog } from "./";
import { DashBoardInfoType } from "../schemas"

interface DashboardProps {
  data: DashBoardInfoType,
}

export const Dashboard = ({data}: DashboardProps) => {
  const user = 'user';
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
    
  const statCardData = [
      {
        id: 1,
        value: data.properties.length,
        label: "Total de Propiedades",
        note: "10% mas desde la semana pasada",
        icon: <MapsHomeWorkOutlined />,
      },
      {
        id: 2,
        value: data.questions.length,
        label: "Total de Preguntas",
        note: "10% mas desde la semana pasada",
        icon: <QuestionAnswer />,
      },
      {
        id: 3,
        value: (data.averageRecommendation / 20),
        label: "Recomendación Promedio",
        note: "10% mas desde la semana pasada",
        icon: <RecommendOutlined />,
      },
  ];
    
  const handleAddNewProperty = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          placeItems: "center",
          alignItems: isSmallScreen ? "flex-start" : "center",
          mt: 5,
        }}
      >
        <Box
          sx={{
            borderRadius: "100%",
            width: isSmallScreen ? "60px" : "80px",
            height: isSmallScreen ? "60px" : "80px",
            backgroundColor: "#190041",
            mr: isSmallScreen ? 0 : 2,
            mb: isSmallScreen ? 1 : 0,
          }}
        ></Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: isSmallScreen ? "1.5rem" : "1.875rem",
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          Bienvenido a tu panel de control, {user}!
        </Typography>
      </Box>

      <AddNewPropertyButton onClick={handleAddNewProperty}/>
      <NewPropertyDialog open={isDialogOpen} onClose={handleCloseDialog} />

      <StatCardContainer statCardData={statCardData} />

      <OpportunitiesAndReviewsGrid lastQuestionsAsked={data.lastQuestionsAsked} bestProperty={data.topPerformingProperties[0]} />

      <Box
        sx={{
          mt: "48px",
          width: "100%",
          border: "2px solid #D4D4D4",
          borderRadius: "20px",
          p: "16px",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: "1.125rem", fontWeight: 600, mb: "16px" }}
        >
          Propiedades destacadas
        </Typography>

        <Stack spacing={1.5}>
          {data.topPerformingProperties.map((property, index) => (
            <TopPerformingCard 
                key={`${property.propertyId}-TopPerformingCard-${index}`} 
                title={property.title} 
                image={property.image} 
                rateGlobal={property.rateGlobal!}
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}
