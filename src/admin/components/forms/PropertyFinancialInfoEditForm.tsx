import { Controller, useFormContext } from "react-hook-form";
import { Box, DialogContent, FormControl, FormLabel, InputAdornment, MenuItem, Select, Skeleton } from "@mui/material";
import { StyledTextField } from "../ui";
import { createNumberValidationRules, preventInvalidNumberCharacters, validateURL } from "../../utils";

export const PropertyFinancialInfoEditForm = () => {
  const { register, watch, control, formState: {errors} } = useFormContext();
  const image = watch('image', '');

  const validationRules = {
    bedrooms: createNumberValidationRules(1, "El número de habitaciones debe ser al menos 1", "El campo habitaciones es obligatorio"),
    bathrooms: createNumberValidationRules(1, "El número de baños debe ser al menos 1", "El campo baños es obligatorio"),
    monthlyPayment: createNumberValidationRules(0, "La mensualidad no puede ser negativa", undefined),
  };
  
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "400px",
          maxHeight: "230px",
          borderRadius: "16px",
          mx: "auto",
          width: "100%",
          height: "230px",
          mt: "-20px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Imagen de la Propiedad"
            title="Imagen de la Propiedad"
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
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

      <DialogContent
        sx={{
          display: "grid",
          gridTemplateColumns: {
            md: "1fr",
            lg: "repeat(2, 1fr)",
          },
          gap: 2,
          overflowY: "unset",
        }}
      >
        <FormControl fullWidth>
          <FormLabel htmlFor="edit_numberRooms" sx={{ color: "primary.main" }}>
            Número de habitaciones: *
          </FormLabel>
          <StyledTextField
            {...register("bedrooms", validationRules.bedrooms)}
            type="number"
            label="Ingrese el número de habitaciones"
            id="edit_numberRooms"
            name="bedrooms"
            onKeyDown={preventInvalidNumberCharacters}
            slotProps={{ htmlInput: { min: 1 } }}
            error={!!errors.bedrooms}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel
            htmlFor="edit_numberBathrooms"
            sx={{ color: "primary.main" }}
          >
            Número de baños: *
          </FormLabel>
          <StyledTextField
            {...register("bathrooms", validationRules.bathrooms)}
            type="number"
            label="Ingrese el número de baños"
            id="edit_numberBathrooms"
            name="bathrooms"
            required
            onKeyDown={preventInvalidNumberCharacters}
            slotProps={{ htmlInput: { min: 1 } }}
            error={!!errors.bathrooms}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel
            htmlFor="edit_monthlyPayment"
            sx={{ color: "primary.main" }}
          >
            Mensualidad requerida:
          </FormLabel>
          <StyledTextField
            {...register("monthlyPayment", validationRules.monthlyPayment)}
            type="number"
            label="Ingrese la mesualidad mín."
            id="edit_monthlyPayment"
            name="monthlyPayment"
            onKeyDown={preventInvalidNumberCharacters}
            slotProps={{ htmlInput: { min: 0, step: 0.01 }, input: {
              startAdornment: <InputAdornment position="end" sx={{mr: '2px'}}>$ </InputAdornment>,
            }}}
            error={!!errors.monthlyPayment}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="edit_propertyType" sx={{ color: "primary.main" }}>
            Tipo de Propiedad:
          </FormLabel>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            rules={{ required: "El tipo de propiedad es obligatorio" }}
            render={({ field }) => (
              <Select
                {...field}
                id="edit_propertyType"
                displayEmpty
                size="small"
                sx={{mt: "8px", borderRadius: "10px", color: 'black'}}
                error={!!errors.type}
              >
                <MenuItem value="">Tipo de Propiedad</MenuItem>
                <MenuItem value="Casa">Casa</MenuItem>
                <MenuItem value="Terreno">Terreno</MenuItem>
                <MenuItem value="Apartamento">Apartamento</MenuItem>
                <MenuItem value="Lote">Lote</MenuItem>
                <MenuItem value="Oficina">Oficina</MenuItem>
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="edit_propertyURL" sx={{ color: "primary.main" }}>
            URL:
          </FormLabel>
          <StyledTextField
            {...register("link", validateURL())}
            type="url"
            label="Ingrese la URL"
            id="edit_propertyURL"
            name="link"
            error={!!errors.link}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel
            htmlFor="edit_propertyURLImage"
            sx={{ color: "primary.main" }}
          >
            Imagen (URL):
          </FormLabel>
          <StyledTextField
            {...register("image", validateURL())}
            type="url"
            label="Ingrese la URL de la imagen"
            id="edit_propertyURLImage"
            name="image"
            error={!!errors.image}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel
            htmlFor="edit_availabilityDate"
            sx={{ color: "primary.main" }}
          >
            Disponible a partir de: *
          </FormLabel>
          <StyledTextField
            {...register("availabilityDate",  {
              required: "La fecha de disponibilidad es obligatoria",
            })}
            type="date"
            id="edit_availabilityDate"
            name="availabilityDate"
            error={!!errors.availabilityDate}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel
            htmlFor="edit_constructionDate"
            sx={{ color: "primary.main" }}
          >
            Fecha de Construcción:
          </FormLabel>
          <StyledTextField
            {...register("dateConstruction")}
            type="date"
            id="edit_constructionDate"
            name="dateConstruction"
          />
        </FormControl>
      </DialogContent>
    </Box>
  );
};
