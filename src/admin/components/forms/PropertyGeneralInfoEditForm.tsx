import { useFormContext } from "react-hook-form";
import { Box, DialogContent, FormControl, FormLabel, InputAdornment, Typography } from "@mui/material"
import { StyledTextField, Textarea } from "../ui"
import { createNumberValidationRules, limitDescriptionLength, preventInvalidNumberCharacters } from "../../utils";


export const PropertyGeneralInfoEditForm = () => {
  const { register, watch, setValue, formState: {errors} } = useFormContext();
  const description = watch("description", "");

  const validationRules = {
    lotSize: createNumberValidationRules(0, "El Tamaño del lote no puede ser negativo", undefined),
    price: createNumberValidationRules(1, "El precio debe ser al menos 1", "El campo precio es obligatorio"),
    hitch: createNumberValidationRules(0, "El enganche no puede ser negativo", undefined),
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const limitedValue = limitDescriptionLength(value);
    setValue("description", limitedValue, { shouldDirty: true });
  };
  
  return (
    <DialogContent sx={{ overflowY: "unset" }}>
      <FormControl fullWidth>
        <FormLabel htmlFor="edit_address" sx={{ color: "primary.main" }}>
          Dirección: *
        </FormLabel>
        <StyledTextField
          {...register("address", {
            required: "El campo Dirección es obligatorio",
          })}
          label="Ingrese la dirección"
          id="edit_address"
          name="address"
          autoComplete="street-address"
          error={!!errors.address}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="edit_propertyName" sx={{ color: "primary.main" }}>
          Nombre de la propiedad: *
        </FormLabel>
        <StyledTextField
          {...register("title", {
            required: "El campo Nombre de la propiedad es obligatorio",
          })}
          label="Ingrese el nombre de la propiedad"
          id="edit_propertyName"
          name="title"
          error={!!errors.title}
        />
      </FormControl>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            md: "1fr",
            lg: "repeat(2, 1fr)",
          },
          gap: 2,
          mt: {
            md: "28px"
          }
        }}
      >
        <FormControl>
          <FormLabel htmlFor="edit_city" sx={{ color: "primary.main" }}>
            Ciudad:
          </FormLabel>
          <StyledTextField
            {...register("location")}
            label="Ingrese la Ciudad"
            id="edit_city"
            name="location"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="edit_lotSize" sx={{ color: "primary.main" }}>
            Tamaño del lote:
          </FormLabel>
          <StyledTextField
            {...register("lotSize", validationRules.lotSize)}
            type="number"
            label="Ingrese el tamaño"
            id="edit_lotSize"
            name="lotSize"
            onKeyDown={preventInvalidNumberCharacters}
            slotProps={{htmlInput: { min: 0, step: 0.01 }, input: {
              endAdornment: <InputAdornment position="start">mts</InputAdornment>,
            },}}
            error={!!errors.lotSize}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="price" sx={{ color: "primary.main" }}>
            Precio: *
          </FormLabel>
          <StyledTextField
            {...register("price", validationRules.price)}
            type="number"
            label="Ingrese el precio"
            id="price"
            name="price"
            error={!!errors.price}
            onKeyDown={preventInvalidNumberCharacters}
            slotProps={{htmlInput: { min: 1, step: 0.01 }, input: {
              startAdornment: <InputAdornment position="end" sx={{mr: '2px'}}>$ </InputAdornment>,
            },}}
          />
        </FormControl>

        <FormControl>
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
            slotProps={{htmlInput: { min: 0, step: 0.01 }, input: {
              startAdornment: <InputAdornment position="end" sx={{mr: '2px'}}>$ </InputAdornment>,
            }}}
            error={!!errors.hitch}
          />
        </FormControl>
      </Box>

      <FormControl fullWidth margin="normal" sx={{ position: "relative" }}>
        <FormLabel htmlFor="edit_description" sx={{ color: "primary.main" }}>
          Descripción: *
        </FormLabel>
        <Textarea
          {...register("description", {
            required: 'El campo Descripción es obligatorio',
            minLength: {
              value: 1,
              message: "La descripción debe tener al menos 1 carácter",
            },
            maxLength: {
              value: 500,
              message: "La descripción no puede exceder los 500 caracteres",
            },
          })}
          placeholder="Ingrese la descripción de la propiedad"
          id="edit_description"
          name="description"
          minRows={6}
          onChange={handleDescriptionChange}
          sx={{
            paddingBottom: "30px",
            border: `1px solid ${(!!errors.description && !description) ? '#d32f2f' : 'gray[400]'}`,
            fontSize: '16px'
          }}
        />
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 12,
          }}
        >
          {description.length} / 500
        </Typography>
      </FormControl>
    </DialogContent>
  );
}
