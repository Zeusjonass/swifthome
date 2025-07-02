"use client"
import { useEffect } from "react";
import { useForm, FormProvider, FieldErrors, Controller } from "react-hook-form";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CancelOutlined, SaveOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { PropertyFinancialInfoEditForm, PropertyGeneralInfoEditForm } from "./forms";
import { PropertyTags, StyledButton } from "./ui";
import { Property, PropertyFormData } from "../schemas";
import { editProperty } from "../api";

interface EditPropertyDialogProps {
  open: boolean;
  clientId: string;
  onClose: () => void;
  property: Property | null;
}

export const EditPropertyDialog = ({ open, onClose, property, clientId }: EditPropertyDialogProps) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
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
      availabilityDate: "",
      dateConstruction: "",
      tags: [] as string[],
    },
  });
  const { reset } = methods;

  useEffect(() => {
    if (property) {
      reset({
        address: property.address || "",
        title: property.title || "",
        location: property.location || "",
        lotSize: property.lotSize || 0,
        price: property.price || 0,
        hitch: property.hitch || 0,
        description: property.description || "",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        monthlyPayment: property.monthlyPayment || 0,
        type: property.type || "",
        link: property.link || "",
        image: property.image || "",
        availabilityDate: new Date(property.availabilityDate * 1000).toISOString().split("T")[0] || "",
        dateConstruction: property.dateConstruction
          ? new Date(property.dateConstruction).toISOString().split("T")[0]
          : "",
        tags: Array.isArray(property.tags) ? property.tags : [],
      });
    }
  }, [property, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: editProperty,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Error al guardar la propiedad", { variant: "error" });
    },
  });

  const onlyDirtyFields = (propertyEdited: PropertyFormData) => {
    const propertyToSend: Record<string, unknown> = {};
    for (const field in propertyEdited) {
      const key = field as keyof PropertyFormData;
      if (methods.formState.dirtyFields[key]) {
        propertyToSend[key] = propertyEdited[key];
      }
    }
    propertyToSend["propertyId"] = property?.propertyId;
    return propertyToSend;
  };

  const onSubmit = (data: PropertyFormData) => {
    const propertyEdited = {
      ...property,
      ...data,
      lotSize: Number(data.lotSize),
      price: Number(data.price),
      hitch: Number(data.hitch),
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      monthlyPayment: Number(data.monthlyPayment),
      availabilityDate: Math.floor(new Date(data.availabilityDate).getTime() / 1000),
      dateConstruction: data.dateConstruction ? new Date(data.dateConstruction).getTime() : null,
    };
    const dirtyFieldsToSend = onlyDirtyFields(propertyEdited);
    mutate({property: dirtyFieldsToSend, clientId});
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
      <DialogTitle>Editar Propiedad</DialogTitle>

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
            {property && <PropertyGeneralInfoEditForm />}
            {property && <PropertyFinancialInfoEditForm />}
          </DialogContent>

          <Controller
            name="tags"
            control={methods.control}
            render={({ field }) => <PropertyTags tags={field.value} setTags={field.onChange} />}
          />

          <DialogActions sx={{ padding: "25px" }}>
            <StyledButton endIcon={<CancelOutlined />} sx={{ backgroundColor: "white" }} onClick={onClose}>
              Cancelar
            </StyledButton>
            <StyledButton endIcon={<SaveOutlined />} type="submit" disabled={isPending || !methods.formState.isDirty}>
              {isPending ? <CircularProgress size={24} /> : "Guardar"}
            </StyledButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
