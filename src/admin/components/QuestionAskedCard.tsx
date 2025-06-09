import { Box, Chip, Typography } from "@mui/material";
import { LastQuestionsAsked } from "../schemas";
import { getTimeAgo } from "../utils";
import { Star } from "@mui/icons-material";

interface QuestionAskedCardProps {
  lastQuestionAsked: LastQuestionsAsked,
}

export const QuestionAskedCard = ({ lastQuestionAsked }: QuestionAskedCardProps) => {

  const hasProperties = lastQuestionAsked.properties.length > 0;

  return (
    <Box>
      <Chip
        icon={<Star />}
        label={hasProperties ? 
          lastQuestionAsked.properties[0].rate ? `Puntaje: ${lastQuestionAsked.properties[0].rate}` 
          : 'N/A' : 'Sin Propiedades'
        }
        color="info"
        sx={{
          height: "39px",
          fontWeight: "600",
          fontSize: "0.75rem",
          mb: "16px",
          borderRadius: "16px",
        }}
      />

      <Typography variant="h5" sx={{ fontSize: "1rem", fontWeight: "600" }}>
        {lastQuestionAsked.message}
      </Typography>
      <Box display="flex" justifyContent="space-between" my="8px">
        <Typography
          variant="h5"
          sx={{ fontSize: "0.75rem", fontWeight: "500" }}
        >
          {hasProperties ? lastQuestionAsked.properties[0].title : 'Sin Propiedad'}
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "0.75rem", color: "#939393" }}>
          {getTimeAgo(lastQuestionAsked.createdAt)}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ fontSize: "0.75rem", color: "#08363D" }}
      >
        {hasProperties ? 
          lastQuestionAsked.properties[0].reason ? lastQuestionAsked.properties[0].reason : 'No se devolvió una razón para esta propiedad'
          : 'No se devolvieron propiedades para esa pregunta'
        }
      </Typography>
    </Box>
  );
}
