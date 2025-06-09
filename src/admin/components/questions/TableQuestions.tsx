"use client"
import { useState } from "react";
import { Checkbox, IconButton, TableCell, TableRow, Collapse, Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Question } from "../../schemas";
import { BaseTable } from "../ui";
import { QuestionOptionsSelector } from "./QuestionOptionsSelector";

interface TableQuestionsProp {
  headCells: { id: string, label: string }[];
  questions: Question[];
  updateQuestion: (q: Question) => void
}

export const TableQuestions = ({headCells, questions, updateQuestion}: TableQuestionsProp) => {
  return (
    <BaseTable headCells={headCells}>
      {questions.map((question) => (
        <Row key={question.questionId} question={question} updateQuestion={updateQuestion}/>
      ))}
    </BaseTable>
  );
}

const Row = ({question, updateQuestion}: { question: Question, updateQuestion: (q: Question) => void }) => {
  const [open, setOpen] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion({ ...question, selected: event.target.checked });
  };

  return (
    <TableRow>
      <TableCell colSpan={3} sx={{
        p: 0,
        border: "1px solid #D4D4D4",
        borderRadius: "20px",
        overflow: "hidden",
      }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.5,
          }}
        >
          <Checkbox
            id={question.questionId}
            checked={question.selected}
            onChange={handleCheckboxChange}
            sx={{
              color: '#8B7FAB',
              '&.Mui-checked': { color: '#65558F' },
              mr: 2
            }}
          />
          <Box sx={{ flexGrow: 1, fontWeight: 600, fontSize: '16px' }}>{question.displayText}</Box>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>

        <Collapse in={open} timeout="auto">
          <Box sx={{ p: 2 }}>
            <QuestionOptionsSelector question={question} updateQuestion={updateQuestion}/>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
