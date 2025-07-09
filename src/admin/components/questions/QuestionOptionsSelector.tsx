import { useState, useRef } from "react";
import { 
  Box, 
  Chip, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  OutlinedInput, 
  Select, 
  SelectChangeEvent,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
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


const isPriceRelatedQuestion = (question: Question): boolean => {
  const priceKeywords = ["presupuesto","mensualidad","enganche",];
  const questionText = (question.displayText || question.shortText || "").toLowerCase();
  
  return priceKeywords.some(keyword => questionText.includes(keyword));
};

const formatCurrency = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return `$${numValue.toLocaleString('es-MX')}`;
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


  const [openDialog, setOpenDialog] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const { value } = event.target;
    const newValues = typeof value === "string" ? value.split(",") : value;
  

    if (isPriceRelatedQuestion(question) && newValues.includes("custom")) {
      const filteredValues = newValues.filter(val => val !== "custom");
      setOptions(filteredValues);
      setOpenDialog(true);
      return;
    }
  
    setOptions(newValues);
  
    const updatedOptions = question.options.map((option) => ({
      ...option,
      selected: newValues.includes(option.value),
    }));
  
    updateQuestion({ ...question, options: updatedOptions });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCustomValue("");
    setError("");
  };

  const handleDialogSubmit = () => {

    const numValue = Number(customValue);
    if (isNaN(numValue)) {
      setError("Por favor ingrese un valor numérico válido");
      return;
    }
    const newOption = {
      value: numValue,
      displayText: formatCurrency(numValue),
      selected: true,
      custom: true
    };

    const existingOptionIndex = question.options.findIndex(
      opt => opt.value === numValue || opt.value === String(numValue)
    );

    let updatedOptions;
    if (existingOptionIndex >= 0) {
      updatedOptions = question.options.map((option, index) => ({
        ...option,
        selected: index === existingOptionIndex ? true : options.includes(option.value)
      }));
    } else {
      updatedOptions = [
        ...question.options.map(option => ({
          ...option,
          selected: options.includes(option.value)
        })),
        newOption
      ];
    }

    updateQuestion({ ...question, options: updatedOptions });
  
    setOptions([...options, numValue]);
    handleDialogClose();
  };


  const isPriceQuestion = isPriceRelatedQuestion(question);

  return (
    <>
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel id={`label-${question.shortText}`}>
          {question.shortText}
        </InputLabel>
        <Select
          labelId={`label-${question.shortText}`}
          id={`${question.questionId}-${question.options[0]?.displayText || "options"}`}
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
                // Usar el displayText de la opción si está disponible, o formatear el valor como moneda si es un número
                const label = option?.displayText || (typeof value === 'number' ? formatCurrency(value) : value);
                return <Chip key={value} label={label} />;
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
          
          {/* Opción adicional para preguntas relacionadas con precios */}
          {isPriceQuestion && (
            <MenuItem value="custom" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Ingresar valor específico
            </MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Diálogo para ingresar un valor personalizado */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Ingrese un valor específico</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="custom-value"
            label="Valor"
            type="number"
            fullWidth
            variant="outlined"
            value={customValue}
            onChange={(e) => {
              setCustomValue(e.target.value);
              setError("");
            }}
            error={!!error}
            inputRef={inputRef}
            InputProps={{
              startAdornment: "$"
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleDialogSubmit} variant="contained">Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};