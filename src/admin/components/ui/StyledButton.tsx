"use client";
import { Button, styled } from "@mui/material";


export const StyledButton = styled(Button)(({ theme }) => ({
    width: "auto",
    height: "48px",
    padding: '15px',
    textTransform: "none",
    borderRadius: "60px",
    backgroundColor: theme.palette.tertiary.main,
    border: "1px solid grey",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.tertiary.light,
    },
  }));