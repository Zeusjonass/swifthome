import { useState } from "react";
import { Box, Button, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { formatCurrency } from "../utils";
import { Property } from "../schemas";
import { EditPropertyDialog } from "./EditPropertyDialog";
import { PropertyStatusSelect } from "./forms";
import { BaseTable } from "./ui";

interface TablePropertiesProps {
  headCells: { id: string, label: string }[];
  properties: Property[];
}

export const TableProperties = ({headCells, properties}: TablePropertiesProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEditProperty = (property: Property) => {
    setPropertyToEdit(property);
    setIsDialogOpen(true);
  };

  return (
    <>
      <BaseTable headCells={headCells}>
        {properties.map((property) => (
          <TableRow key={property.propertyId} hover>
            {/* Imagen */}
            <TableCell sx={{ borderBottom: "none", border: "1px solid #D4D4D4", borderRight: "none", borderRadius: "20px 0px 0px 20px" }}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    maxWidth: "89px",
                    maxHeight: "63px",
                    width: "100%",
                    height: "63px",
                    borderRadius: "16px",
                    mr: "16px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: "89 / 63",
                  }}
                >
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title}
                      style={{ borderRadius: "16px", width: '100%', height: '100%' }}
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder-image-min.png")
                      }
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{ borderRadius: "16px" }}
                    />
                  )}
                </Box>
                <Typography>{property.title}</Typography>
              </Box>
            </TableCell>

            {/* Datos */}
            <TableCell sx={{ borderBottom: "none", border: "1px solid #D4D4D4", borderLeft: "none", borderRight: 'none'}}>
              {property.dateConstruction
                ? new Date(property.dateConstruction).toLocaleDateString()
                : "No especificado"}
            </TableCell>
            <TableCell sx={{ borderBottom: "none", border: "1px solid #D4D4D4", borderLeft: "none", borderRight: 'none'}}>
              {formatCurrency(property.price, "MXN")}
            </TableCell>
            <TableCell sx={{ borderBottom: "none", border: "1px solid #D4D4D4", borderLeft: "none", borderRight: 'none'}}>
              <PropertyStatusSelect
                propertyId={property.propertyId!}
                status={property.status}
              />
            </TableCell>

            {/* Acción */}
            <TableCell sx={{ borderBottom: "none", border: "1px solid #D4D4D4", borderLeft: "none", borderRadius: "0px 20px 20px 0px"}}>
              <Button
                onClick={() => handleEditProperty(property)}
                color="primary"
                sx={{
                  width: "100px",
                  height: "48px",
                  textTransform: "none",
                  borderRadius: "60px",
                  backgroundColor: "tertiary.main",
                }}
              >
                <Typography variant="body2">Editar</Typography>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </BaseTable>
      <EditPropertyDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        property={propertyToEdit}
      />
    </>
  );
}
