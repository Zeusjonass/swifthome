import { Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useMutation } from 'react-query';
import { initializeUserQuestions } from '../../api/api-gateway/questions';
import QuestionsCheckboxList from './QuestionsCheckboxList';
import { useState } from 'react';

interface InitializeUserQuestionsProps {
  userId: string;
}

const InitializeUserQuestions = ({ userId }: InitializeUserQuestionsProps) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const initializeUserQuestionsMutation = useMutation(initializeUserQuestions, {
    onSuccess: (data) => {
      console.log('Preguntas guardadas con éxito:', data);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error guardando las preguntas:', error);
    }
  });

  const handleSubmit = () => {
    initializeUserQuestionsMutation.mutate({ userId, questionIds: selectedQuestions });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "16px" }}>
      <QuestionsCheckboxList setSelectedQuestions={setSelectedQuestions} />
      <Button variant="outlined" onClick={handleSubmit} disabled={initializeUserQuestionsMutation.isLoading}
        style={{
          zIndex: "2",
          fontFamily: 'var(--text-font)',
          fontWeight: '700',
          backgroundColor: '#16273B',
          color: '#B0E9FD',
          border: 'none'
        }}>
        Guardar Preguntas
      </Button>
    </Box>
  );
};

export default InitializeUserQuestions;
