"use client"
import { useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CancelOutlined, SaveOutlined } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { PropertyFinancialInfoForm, PropertyGeneralInfoForm } from "./forms";
import { PropertyTags, StyledButton } from "./ui";
import { PropertyFormData } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { newProperty } from "../api";
import CSVUploadButton from "./CSVUploadButton";

interface NewPropertyDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewPropertyDialog = ({
  open,
  onClose,
}: NewPropertyDialogProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const methods = useForm({
    defaultValues: {
      address: "",
      title: "",
      location: "",
      lotSize: 0,
      price: 0,
      hitch: 0,
      description: "",
      bedrooms: 0,
      bathrooms: 0,
      monthlyPayment: 0,
      type: "",
      link: "",
      image: "",
      availabilityDate: new Date().toISOString().split("T")[0],
      dateConstruction: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: newProperty,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data) => {
      setIsSubmitting(false);
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
    },
    onError: (error) => {
      setIsSubmitting(false);
      enqueueSnackbar(error.message || "Error al guardar la propiedad", {
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    const formattedProperty = {
      ...data,
      lotSize: Number(data.lotSize),
      price: Number(data.price),
      hitch: Number(data.hitch),
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      monthlyPayment: Number(data.monthlyPayment),
      availabilityDate: Math.floor(
        new Date(data.availabilityDate).getTime() / 1000
      ),
      dateConstruction: data.dateConstruction
        ? new Date(data.dateConstruction).getTime()
        : null,
      tags,
      status: "Draft",
    };
    mutate(formattedProperty);
  };

  const onError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        enqueueSnackbar(error.message as string, { variant: "error" });
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          gap: isSmallScreen ? 2 : 3,
          overflowY: "unset",
        }}
      >
        <CSVUploadButton></CSVUploadButton>
        <DialogContentText
          sx={{
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          Asegúrate de seguir nuestro{" "}
          <Link
            href="/Formato_Propiedades.csv"
            download="Formato_Propiedades.csv"
          >
            <Typography
              variant="button"
              color="blue"
              textTransform="capitalize"
            >
              formato recomendado
            </Typography>
          </Link>{" "}
          para mejorar la carga de los datos.
        </DialogContentText>
      </DialogContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          px: "2rem",
          "&:before, &:after": {
            content: '""',
            flex: 1,
            borderBottom: "1px solid #ccc",
          },
          "&:not(:empty)::before": { margin: "0 3em 0 0" },
          "&:not(:empty)::after": { margin: "0 0 0 3em" },
        }}
      >
        O
      </Box>

      <DialogTitle>Registrar propiedad manualmente</DialogTitle>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)} noValidate>
          <DialogContent
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "1fr",
                lg: "repeat(2, 1fr)",
              },
              gap: 2,
            }}
          >
            <PropertyGeneralInfoForm />

            <PropertyFinancialInfoForm />
          </DialogContent>

          <PropertyTags tags={tags} setTags={setTags} />

          <DialogActions sx={{ padding: "25px" }}>
            <StyledButton
              endIcon={<CancelOutlined />}
              sx={{ backgroundColor: "white" }}
              onClick={onClose}
            >
              Cancelar
            </StyledButton>
            <StyledButton
              endIcon={<SaveOutlined />}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Guardar"}
            </StyledButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
