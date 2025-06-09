import { Controller, useFormContext } from "react-hook-form";
import { DialogContent, FormControl, FormLabel, InputAdornment, MenuItem, Select } from "@mui/material";
import { StyledTextField } from "../ui";
import { createNumberValidationRules, preventInvalidNumberCharacters, validateURL } from "../../utils";

export const PropertyFinancialInfoForm = () => {
  const { register, control, formState: {errors} } = useFormContext();

  const validationRules = {
    bedrooms: createNumberValidationRules(1, "El número de habitaciones debe ser al menos 1", "El campo habitaciones es obligatorio"),
    bathrooms: createNumberValidationRules(1, "El número de baños debe ser al menos 1", "El campo baños es obligatorio"),
    monthlyPayment: createNumberValidationRules(0, "La mensualidad no puede ser negativa", undefined),
    price: createNumberValidationRules(1, "El precio debe ser al menos 1", "El campo precio es obligatorio"),
    hitch: createNumberValidationRules(0, "El enganche no puede ser negativo", undefined),
  };
  
  return (
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
        <FormLabel htmlFor="numberRooms" sx={{ color: "primary.main" }}>
          Número de habitaciones: *
        </FormLabel>
        <StyledTextField
          type="number"
          {...register("bedrooms", validationRules.bedrooms)}
          label="Ingrese el número de habitaciones"
          id="numberRooms"
          name="bedrooms"
          onKeyDown={preventInvalidNumberCharacters}
          error={!!errors.bedrooms}
          slotProps={{
            htmlInput: { min: 1 },
          }}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="numberBathrooms" sx={{ color: "primary.main" }}>
          Número de baños: *
        </FormLabel>
        <StyledTextField
          {...register("bathrooms", validationRules.bathrooms)}
          type="number"
          label="Ingrese el número de baños"
          id="numberBathrooms"
          name="bathrooms"
          onKeyDown={preventInvalidNumberCharacters}
          error={!!errors.bathrooms}
          slotProps={{ htmlInput: { min: 1 } }}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="price" sx={{ color: "primary.main" }}>
          Precio: *
        </FormLabel>
        <StyledTextField
          {...register("price", validationRules.price)}
          type="number"
          label="Ingrese el precio"
          id="price"
          name="price"
          onKeyDown={preventInvalidNumberCharacters}
          error={!!errors.price}
          slotProps={{htmlInput: { min: 1, step: 0.01 }, input: {
            startAdornment: <InputAdornment position="end" sx={{mr: '2px'}}>$ </InputAdornment>,
          },}}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="hitch" sx={{ color: "primary.main" }}>
          Enganche:
        </FormLabel>
        <StyledTextField
          {...register("hitch", validationRules.hitch)}
          type="number"
          label="Ingrese el enganche"
          id="hitch"
          name="hitch"
          onKeyDown={preventInvalidNumberCharacters}
          error={!!errors.hitch}
          slotProps={{htmlInput: { min: 0, step: 0.01 }, input: {
            startAdornment: <InputAdornment position="end" sx={{mr: '2px'}}>$ </InputAdornment>,
          }}}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="monthlyPayment" sx={{ color: "primary.main" }}>
          Mensualidad requerida:
        </FormLabel>
        <StyledTextField
          {...register("monthlyPayment", validationRules.monthlyPayment)}
          type="number"
          label="Ingrese la mesualidad mín."
          id="monthlyPayment"
          name="monthlyPayment"
          onKeyDown={preventInvalidNumberCharacters}
          error={!!errors.monthlyPayment}
          slotProps={{ htmlInput: { min: 0, step: 0.01 }, input: {
            startAdornment: <InputAdornment position="end" sx={{mr: '2px'}}>$ </InputAdornment>,
          }}}
        />
      </FormControl>

      <FormControl fullWidth>
          <FormLabel htmlFor="edit_propertyType" sx={{ color: "primary.main" }}>
            Tipo de Propiedad: *
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
                <MenuItem value="" disabled>Tipo de Propiedad</MenuItem>
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
        <FormLabel htmlFor="propertyURL" sx={{ color: "primary.main" }}>
          URL:
        </FormLabel>
        <StyledTextField
          {...register("link", validateURL())}
          type="text"
          label="Ingrese la URL"
          id="propertyURL"
          name="link"
          error={!!errors.link}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="propertyURLImage" sx={{ color: "primary.main" }}>
          Imagen (URL):
        </FormLabel>
        <StyledTextField
          {...register("image", validateURL())}
          type="url"
          label="Ingrese la URL de la imagen"
          id="propertyURLImage"
          name="image"
          error={!!errors.image}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="availabilityDate" sx={{ color: "primary.main" }}>
          Disponible a partir de: *
        </FormLabel>
        <StyledTextField
          type="date"
          {...register("availabilityDate", {
            required: "La fecha de disponibilidad es obligatoria",
          })}
          error={!!errors.availabilityDate}
          id="availabilityDate"
          name="availabilityDate"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="constructionDate" sx={{ color: "primary.main" }}>
          Fecha de Construcción:
        </FormLabel>
        <StyledTextField
          {...register("dateConstruction")}
          type="date"
          id="constructionDate"
          name="dateConstruction"
        />
      </FormControl>
    </DialogContent>
  );
}
