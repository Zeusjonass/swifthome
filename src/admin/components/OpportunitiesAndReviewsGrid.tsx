"use client"
import Link from "next/link";
import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import { QuestionAskedCard, ProjectReviewOpportunitiesCard, LatestReviewsCard } from "./";
import { LastQuestionsAsked, Property } from "../schemas";

interface OpportunitiesAndReviewsGridProps {
  lastQuestionsAsked: LastQuestionsAsked[];
  bestProperty: Property;
}

export const OpportunitiesAndReviewsGrid = ({ lastQuestionsAsked, bestProperty } : OpportunitiesAndReviewsGridProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const firstQuestionWithProperties = lastQuestionsAsked.find(
    (question) => question.properties.length > 0
  );

  return (
    <Grid container sx={{ mt: "48px", width: "100%" }} spacing={2}>
      <Grid
        size={{ xs: 12, md: 7.5 }}
        sx={{
          border: "2px solid #D4D4D4",
          height: "100%",
          borderRadius: "20px",
          p: "16px",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            sx={{ fontSize: "1.125rem", fontWeight: "600" }}
          >
            Últimas Preguntas
          </Typography>
          <Link href="/admin/questions" style={{textDecoration: 'none', color: 'black'}}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                sx={{
                  color: "white",
                  backgroundColor: "primary.main",
                  borderRadius: "100%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { backgroundColor: "primary.light" },
                }}
              >
                <ArrowOutward sx={{ transform: "scale(1.1)" }} />
              </Box>
              <Typography variant="h5" sx={{ fontSize: "0.625rem" }}>
                Ver todas
              </Typography>
            </Box>
          </Link>
        </Box>

        <Stack spacing={4} sx={{maxHeight: '600px', overflowY: 'auto'}}>
          {lastQuestionsAsked.map((question, index) => (
            <QuestionAskedCard key={index} lastQuestionAsked={question} />
          ))}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4.5 }}>
        <Stack spacing={3}>
          <ProjectReviewOpportunitiesCard isSmallScreen={isSmallScreen} bestProperty={bestProperty}/>
          
          {firstQuestionWithProperties && (
            <LatestReviewsCard lastQuestion={firstQuestionWithProperties} />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}