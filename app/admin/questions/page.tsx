"use client"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material"
import { SaveOutlined } from "@mui/icons-material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { enqueueSnackbar } from "notistack";
import { Question } from "@/src/admin/schemas";
import { updateUserQuestions } from "@/src/admin/api";
import { SkeletonQuestions, StyledButton, TableQuestions } from "@/src/admin/components";

const headCells = [
  { id: "checkbox", label: "" },
  { id: "question", label: "Pregunta" },
  { id: "expand", label: "" },
];

const QuestionsView = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const queryClient = useQueryClient();
  const questions = queryClient.getQueryData<Question[]>(["clientQuestions"]);
  const [questionsState, setQuestionsState] = useState<Question[]>(questions || []);
  const {mutate, isPending} = useMutation({
    mutationFn: updateUserQuestions,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      queryClient.invalidateQueries({queryKey: ['clientQuestions']});
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Ha ocurrido un error al editar las preguntas", { variant: "error" });
    },
  });
  
  const updateQuestion = (updatedQuestion: Question) => {
    setQuestionsState(prev =>
      prev.map(question => question.questionId === updatedQuestion.questionId ? updatedQuestion : question)
    );
  }

  const handleSubmit = () => {
    mutate({ questions: questionsState, userId: user?.userId });
  }

  if (isPending) {
    return <SkeletonQuestions />
  }

  return (
    <Box
      sx={{
        mt: "48px",
        width: "100%",
        maxHeight: "100vh",
        height: "auto",
        border: "2px solid #D4D4D4",
        borderRadius: "20px",
        p: "16px",
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontSize: "1.125rem", fontWeight: 600 }}
      >
        Selecciona las preguntas que te gustaría ver al filtrar tus propiedades
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: "16px" }}
      >
        <Typography variant="h5" sx={{ fontSize: "1rem", mb: "16px" }}>
          Todas ({questions?.length})
        </Typography>
        <StyledButton
          endIcon={<SaveOutlined />}
          onClick={handleSubmit}
        >
          Guardar
        </StyledButton>
      </Box>

      <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {questions && (
          <TableQuestions headCells={headCells} questions={questionsState} updateQuestion={updateQuestion}/>
        )}
      </Box>
    </Box>
  );
};

export default QuestionsView;