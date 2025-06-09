"use client"
import { useState } from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Question } from "../../schemas";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const QuestionOptionsSelector = ({question, updateQuestion}: { question: Question, updateQuestion: (q: Question) => void }) => {
  const [options, setOptions] = useState<(string | number)[]>(
    question.options.filter((option) => {
      if (option.selected) {
        return option.selected;
      }
      return false;
    }).map(option => option.value)
  );

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const { value } = event.target;
    const newValues = typeof value === "string" ? value.split(",") : value;
  
    setOptions(newValues);
  
    const updatedOptions = question.options.map((option) => ({
      ...option,
      selected: newValues.includes(option.value),
    }));
  
    updateQuestion({ ...question, options: updatedOptions });
  };

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel id={`label-${question.shortText}`}>
        {question.shortText}
      </InputLabel>
      <Select
        labelId={`label-${question.shortText}`}
        id={`${question.questionId}-${question.options[0].displayText}`}
        multiple
        value={options}
        onChange={handleChange}
        input={
          <OutlinedInput
            id={`select-multiple-${question.questionId}`}
            label={question.shortText}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => {
              const option = question.options.find(
                (opt) => opt.value === value
              );
              return <Chip key={value} label={option?.displayText || value} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {question.options.map((option, index) => (
          <MenuItem
            key={`${question.questionId}-${option.displayText}-${index}`}
            value={option.value}
          >
            {option.displayText}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
