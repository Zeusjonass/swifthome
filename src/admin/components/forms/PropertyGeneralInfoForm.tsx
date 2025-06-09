import { useFormContext } from "react-hook-form";
import { DialogContent, FormControl, FormLabel, InputAdornment, Stack, Typography } from "@mui/material"
import { StyledTextField, Textarea } from "../ui";
import { createNumberValidationRules, limitDescriptionLength, preventInvalidNumberCharacters } from "../../utils";

export const PropertyGeneralInfoForm = () => {
  const { register, watch, setValue, formState: {errors} } = useFormContext();
  const description = watch("description", "");

  const validationRules = {
    lotSize: createNumberValidationRules(0, "El Tamaño del lote no puede ser negativo", undefined),
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue("description", limitDescriptionLength(value));
  };

  return (
    <DialogContent sx={{ overflowY: "unset" }}>
      <FormControl fullWidth>
        <FormLabel htmlFor="address" sx={{ color: "primary.main" }}>
          Dirección: *
        </FormLabel>
        <StyledTextField
          {...register("address", {
            required: "El campo Dirección es obligatorio",
          })}
          label="Ingrese la dirección"
          id="address"
          name="address"
          error={!!errors.address}
          autoComplete="street-address"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="propertyName" sx={{ color: "primary.main" }}>
          Nombre de la propiedad: *
        </FormLabel>
        <StyledTextField
          {...register("title", {
            required: "El campo Nombre de la propiedad es obligatorio",
          })}
          label="Ingrese el nombre de la propiedad"
          id="propertyName"
          name="title"
          error={!!errors.title}
        />
      </FormControl>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, md: 2 }}>
        <FormControl>
          <FormLabel htmlFor="city" sx={{ color: "primary.main" }}>
            Ciudad:
          </FormLabel>
          <StyledTextField
            {...register("location")}
            label="Ingrese la Ciudad"
            id="city"
            name="location"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="lotSize" sx={{ color: "primary.main" }}>
            Tamaño del lote:
          </FormLabel>
          <StyledTextField
            {...register("lotSize", validationRules.lotSize)}
            type="number"
            label="Ingrese el tamaño (en mts)"
            id="lotSize"
            name="lotSize"
            onKeyDown={preventInvalidNumberCharacters}
            error={!!errors.lotSize}
            slotProps={{
              htmlInput: { min: 0, step: 0.01 },
              input: {
                endAdornment: (
                  <InputAdornment position="start">mts</InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
      </Stack>

      <FormControl fullWidth margin="normal" sx={{ position: "relative" }}>
        <FormLabel htmlFor="description" sx={{ color: "primary.main" }}>
          Descripción: *
        </FormLabel>
        <Textarea
          placeholder="Ingrese la descripción de la propiedad"
          id="description"
          minRows={6}
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
          name="description"
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
