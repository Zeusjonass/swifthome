import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Grid, Typography } from '@mui/material';
import { useGetAllQuestionsQuery } from '../../api/api-gateway/questions';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { keyframes } from '@emotion/react';

interface QuestionsCheckboxListProps {
  setSelectedQuestions: Dispatch<SetStateAction<string[]>>;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const QuestionsCheckboxList: FC<QuestionsCheckboxListProps> = ({ setSelectedQuestions }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const { data: questions, isLoading } = useGetAllQuestionsQuery();

  const handleToggle = (questionId: string) => () => {
    const currentIndex = checked.indexOf(questionId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      if (checked.length < 8) {
        newChecked.push(questionId);
      }
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setSelectedQuestions(newChecked);
  };

  const getCheckboxLabel = (questionId: string) => {
    const index = checked.indexOf(questionId);
    return index !== -1 ? (index + 1).toString() : '';
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List 
      sx={{ 
        width: '100%', 
        maxWidth: 700, 
        bgcolor: 'rgba(22, 40, 59, 0.8)',
        padding: "16px", 
        margin: "8px", 
        color: "#d9e0e7", 
        maxHeight: '65vh', 
        overflowY: 'auto',
        borderRadius: "10px",
        animation: `${fadeIn} 1s ease-in-out`,
        fontFamily: '"Impact", Charcoal, sans-serif'
      }}
    >
      <Typography variant='h5' sx={{ margin: "6px" }} fontWeight="600">Elige hasta 8 preguntas que te ayudarán a filtrar tus resultados</Typography>
      {questions?.map((question) => {
        const labelId = `checkbox-list-label-${question.questionId}`;
        const isChecked = checked.indexOf(question.questionId) !== -1;

        return (
          <ListItem 
            key={question.questionId} 
            disablePadding 
            sx={{ 
              borderRadius: "10px",
              paddingLeft: "15px",
              bgcolor: isChecked ? 'rgba(31, 50, 69, 0.8)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(31, 50, 69, 0.8)', cursor: 'pointer' } 
            }}
            onClick={handleToggle(question.questionId)}
          >
            <Grid container alignItems="center">
              <Grid item xs>
                <ListItemText id={labelId} primary={question.displayText} />
              </Grid>
              <Grid item>
                <ListItemIcon>
                  <Checkbox
                    edge="end"
                    checked={isChecked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onChange={handleToggle(question.questionId)}
                    onClick={(e) => e.stopPropagation()}
                    icon={<div style={{ 
                      width: 24, 
                      height: 24, 
                      border: '1px solid gray', 
                      borderRadius: '50%', 
                      textAlign: 'center', 
                      lineHeight: '24px', 
                      color: '#d9e0e7' 
                    }} />}
                    checkedIcon={<div style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      textAlign: 'center', 
                      lineHeight: '24px', 
                      color: '#d9e0e7', 
                      backgroundColor: '#0657a0'
                    }}>{getCheckboxLabel(question.questionId)}</div>}
                  />
                </ListItemIcon>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};

export default QuestionsCheckboxList;
