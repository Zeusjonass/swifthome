"use client";
import { styled, TextField, TextFieldProps } from "@mui/material";


export const StyledTextField = styled((props: TextFieldProps) => (
    <TextField size="small" fullWidth margin="normal" {...props} />
  ))(({ theme }) => ({
    marginTop: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      padding: "0rem",
    },
}));