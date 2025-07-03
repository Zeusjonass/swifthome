"use client"
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { TableProperties } from "./TableProperties";
import { AddNewPropertyButton, SearchBar } from "./ui";
import { Property } from "../schemas";
import { NewPropertyDialog } from "./NewPropertyDialog";

const headCells = [
  { id: "propertyName", label: "Nombre" },
  { id: "createdAt", label: "Creado el" },
  { id: "price", label: "Precio" },
  { id: "status", label: "Estado" },
  { id: "action", label: "Acción" },
];

interface PropertiesProps {
  properties: Property[];
}

export const Properties = ({ properties }: PropertiesProps) => {
  const clientId = properties.length > 0 ? properties[0].clientId : "";
  const [searchPropertie, setSearchPropertie] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNewProperty = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const filteredProperty = searchPropertie.trim()
    ? properties.filter((property) => {
      const dateConstructionString = property.dateConstruction
        ? new Date(property.dateConstruction).toLocaleDateString().toLowerCase()
        : "no especificado";
  
      return (
        property.title.toLowerCase().includes(searchPropertie.toLowerCase()) ||
        dateConstructionString.includes(searchPropertie.toLowerCase()) ||
        String(property.price).toLowerCase().includes(searchPropertie.toLowerCase()) ||
        property.status.toLowerCase().includes(searchPropertie.toLowerCase())
      );
    })
    : properties;

  return (
    <>
      <AddNewPropertyButton onClick={handleAddNewProperty} />
      <NewPropertyDialog open={isDialogOpen} onClose={handleCloseDialog} clientId={clientId} />

      <Box
        sx={{
          mt: "48px",
          width: "100%",
          maxHeight: "100vh",
          height: "auto",
          border: "2px solid #D4D4D4",
          borderRadius: "20px",
          p: "16px",
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: "16px" }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Propiedades
          </Typography>
          <SearchBar
            searchValue={searchPropertie}
            setSearchValue={setSearchPropertie}
            id="searchPropertie"
          />
        </Box>

        <Typography variant="h5" sx={{ fontSize: "1rem", mb: "16px" }}>
          Todos ({filteredProperty.length})
        </Typography>
      
        <Box>
          <TableProperties headCells={headCells} properties={filteredProperty} />
        </Box>
      </Box>
    </>
  );
};