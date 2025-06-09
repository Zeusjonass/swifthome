"use client";
import { styled, TextareaAutosize } from "@mui/material";


export const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid ${theme.palette.grey[400]};
    resize: none;
  
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);