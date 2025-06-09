import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Question, QuestionOption } from "../../types/question";

interface QuestionOptionsSelectProps {
  question: Question;
  selectedOption: QuestionOption; 
  onChange: (questionOption: QuestionOption) => void;
};

const QuestionOptionsSelect = ({ question, selectedOption, onChange }: QuestionOptionsSelectProps) => {
  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedQuestionOption = question.options.find(option => 
      option.value === selectedValue
    );

    if (selectedQuestionOption) {
      onChange(selectedQuestionOption);
    }
  };

  return (
    <FormControl fullWidth sx={{ marginTop: "24px" }}>
      <InputLabel sx={{ 
      backgroundColor: "#16273B", 
      borderRadius:"8px", 
      padding: ".5rem", 
      color:"white", 
      top:{xs:"-1.5rem"},
      left:{xs:"50%",md:"0.5rem"},
      transform:{xs:"translateX(-50%)",md:"none"},
      fontFamily:"var(--title-text)",
      fontSize:{xs:"0.8rem"},
    }}
      
      >{question.displayText}</InputLabel>
      <Select
        value={selectedOption.value}
        onChange={handleChange}
        label={question.displayText}
        sx={{ backgroundColor: "white", marginBottom: "1rem" }}
      >
        {question.options.map((option, index) => (
          <MenuItem key={index} value={option.value} sx={{fontFamily:"var(--title-font)"}}>
            {option.displayText}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default QuestionOptionsSelect;
