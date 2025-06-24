"use client"
import { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { editProperty } from "../../api";
import { Property } from "../../schemas";


export const PropertyStatusSelect = ({propertyId, status}: {propertyId: string | number; status: string;}) => {
  const [propertyStatuses, setPropertyStatuses] = useState<{[propertyId: string | number]: string;}>({});
  const {mutate, isPending} = useMutation({
    mutationFn: editProperty,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      updateStatus(data.updatedAttributes);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Error al guardar la propiedad", { variant: "error" });
    },
  });

  const updateStatus = (property: Property) => {
    setPropertyStatuses((prevStatuses) => ({
      ...prevStatuses,
      [propertyId]: property.status,
    })); 
  }

  const handleStatusChange = (propertyId: string | number, newStatus: string ) => {
    mutate({status: newStatus, propertyId});
  };

  const currentStatus = propertyStatuses[propertyId] || status;

  const getColor = (status: string) => {
    switch (status) {
      case "published":
        return {
          border: "#3BBA2F",
          text: "#4EB84E",
          arrow: "#5FCE97",
        };
      case "draft":
        return {
          border: "#DEEF7D",
          text: "#CBDD67",
          arrow: "#DBE87F",
        };
      case "archived":
        return {
          border: "#858585",
          text: "#AAAAAA",
          arrow: "#A6A6A6",
        };
      default:
        return {
          border: "inherit",
          text: "inherit",
          arrow: "inherit",
        };
    }
  };

  const colors = getColor(currentStatus); 

  return (
    <FormControl size="small">
      <Select
        id={propertyId?.toString()}
        name={propertyId?.toString()}
        value={propertyStatuses[propertyId!] || status}
        onChange={(e) => handleStatusChange(propertyId!, e.target.value)}
        sx={{
          borderRadius: "80px",
          color: colors.text,
          fontWeight: 600,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.border,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.border,
          },
          "& .MuiSelect-select": {
            padding: "2px 8px",
          },
          "& .MuiSelect-icon": {
            color: colors.arrow,
          },
        }}
        disabled={isPending}
      >
        <MenuItem value={"draft"}>Draft</MenuItem>
        <MenuItem value={"published"}>Publicada</MenuItem>
        <MenuItem value={"archived"}>Archivada</MenuItem>
      </Select>
    </FormControl>
  );
};
