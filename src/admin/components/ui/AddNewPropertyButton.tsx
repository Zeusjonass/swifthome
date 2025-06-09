"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

interface AddNewPropertyButtonProps {
  onClick: () => void;
}


export const AddNewPropertyButton = ({ onClick }: AddNewPropertyButtonProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        maxWidth: "251px",
        width: "100%",
        height: "70px",
        backgroundColor: "tertiary.main",
        my: "48px",
        p: "12px 24px",
        borderRadius: "80px",
      }}
    >
      <Typography variant="h5" sx={{ fontSize: "1rem" }}>
        Añadir propiedad
      </Typography>
      <IconButton
        sx={{
          height: "46px",
          width: "46px",
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": { backgroundColor: "primary.light" },
        }}
        aria-label="add-new-property"
        onClick={onClick}
      >
        <AddOutlined />
      </IconButton>
    </Box>
  );
};