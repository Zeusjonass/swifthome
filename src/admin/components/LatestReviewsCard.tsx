import { ArrowOutward } from "@mui/icons-material"
import { Box, Rating, Typography } from "@mui/material"
import { LastQuestionsAsked } from "../schemas";
import { getTimeAgo } from "../utils";


interface LatestReviewsCardProps {
  lastQuestion: LastQuestionsAsked,
}

export const LatestReviewsCard = ({lastQuestion}: LatestReviewsCardProps) => {
  const rate = lastQuestion.properties[0].rateCounter || (lastQuestion.properties[0].rate ? lastQuestion.properties[0].rate / 20 : 0);

  return (
    <Box
      sx={{
        border: "2px solid #D4D4D4",
        height: "auto",
        borderRadius: "20px",
        p: "16px",
        mt: "24px",
        width: "100%",
        maxWidth: "600px",
        mx: "auto",
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
        sx={{ mb: "10px" }}
        alignItems="center"
      >
        <Typography sx={{ fontSize: "1.125rem", fontWeight: "600" }}>
          Tu última pregunta
        </Typography>
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
          <ArrowOutward />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: "60px",
            height: "60px",
            backgroundColor: "pink",
            borderRadius: "100%",
          }}
        ></Box>
        <Box>
          <Typography sx={{ fontSize: "0.875rem", fontWeight: "600" }}>
            {lastQuestion.message}
          </Typography>
          <Rating name="read-only" value={rate} readOnly size="small" />
        </Box>
      </Box>

      <Box>
        <Box display="flex" justifyContent="space-between" my="8px">
          <Typography
            variant="h5"
            sx={{ fontSize: "0.75rem", fontWeight: "600" }}
          >
            {lastQuestion.properties[0].title}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontSize: "0.75rem", color: "#939393" }}
          >
            {getTimeAgo(lastQuestion.createdAt)}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "0.75rem", color: "#08363D" }}
        >
          {lastQuestion.properties[0].reason}
        </Typography>
      </Box>
    </Box>
  );
}
