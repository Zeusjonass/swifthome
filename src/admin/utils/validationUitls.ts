

export const createNumberValidationRules = (
  minValue: number,
  minMessage: string,
  requiredMessage?: string
) => ({
  ...(requiredMessage ? { required: requiredMessage } : {}),
  min: {
    value: minValue,
    message: minMessage,
  },
  validate: (value: any) => {
    if (isNaN(value)) {
      return "El valor debe ser un número válido";
    }
    return Number(value) >= 0 || "El valor no puede ser negativo";
  },
});

export const validateURL = () => ({
  validate: (url: string) => {
    if (url) {
      try {
        new URL(url);
        return true;
      } catch {
        return "Ingrese una URL válida";
      }
    }
  },
});

export const preventInvalidNumberCharacters = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
};

export const limitDescriptionLength = (
  value: string,
  maxLength: number = 500
): string => {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
};