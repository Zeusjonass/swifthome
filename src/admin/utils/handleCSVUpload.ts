import * as Papa from "papaparse";
import { limitDescriptionLength } from "./validationUitls";

type RawProperty = Record<string, string>;

const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
const TAGS_REGEX = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s\/]+$/;

const isNumeric = (value: string) => !isNaN(Number(value)) && value.trim() !== "";
const isValidTags = (value: string) => TAGS_REGEX.test(value);
const isValidStringLength = (value: string, max: number) => value.length <= max;

const isValidDate = (value: string): boolean => {
  if (!DATE_REGEX.test(value)) return false;

  const [dayStr, monthStr, yearStr] = value.split("/");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

interface ValidationError {
  row: number;
  column: string;
  message: string;
}

const REQUIRED_NUMERIC_FIELDS = [
  "NUMERO_HABITACIONES",
  "NUMERO_BANOS",
  "PRECIO",
  "ENGANCHE",
  "MENSUALIDAD",
  "TAMANO"
];

const DATE_FIELDS = [
  "FECHA_DISPONIBILIDAD (DD/MM/AAAA)",
  "FECHA_CONSTRUCCION (DD/MM/AAAA)",
];

const CSV_FIELDS = [
  "DIRECCION",
  "NOMBRE",
  "NUMERO_HABITACIONES",
  "NUMERO_BANOS",
  "PRECIO",
  "ENGANCHE",
  "CIUDAD",
  "TAMANO",
  "MENSUALIDAD",
  "TIPO",
  "URL",
  "IMAGEN (url)",
  "FECHA_DISPONIBILIDAD (DD/MM/AAAA)",
  "FECHA_CONSTRUCCION (DD/MM/AAAA)",
  "ETIQUETAS (separadas por diagonal '/')",
  "DESCRIPCION",
];

const cleanRow = (row: RawProperty): RawProperty => {
  const cleanedRow: RawProperty = {};
  for (const key in row) {
    const trimmedKey = key.trim();
    let value = row[key];

    if (typeof value === "string") {
      
      value = value.replace(/^["'\s]+|["'\s]+$/g, "").trim();
    }

    cleanedRow[trimmedKey] = value ?? "";
  }
  return cleanedRow;
};

const parseCSV = (file: File): Promise<RawProperty[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<RawProperty>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          reject(new Error("Error al leer el CSV."));
        } else {
          const cleanedData = result.data.map(cleanRow);
          resolve(cleanedData);
        }
      },
    });
  });
};

const validateRow = (row: RawProperty, rowIndex: number): ValidationError[] => {
  const errors: ValidationError[] = [];

  const OPTIONAL_FIELDS = [
    "FECHA_CONSTRUCCION (DD/MM/AAAA)",
    "TAMANO",
    "ENGANCHE",
    "MENSUALIDAD",
    "URL",
    "IMAGEN (url)",
    "ETIQUETAS (separadas por diagonal '/')"
  ];

  const REQUIRED_FIELDS = CSV_FIELDS.filter((field) => !OPTIONAL_FIELDS.includes(field));

  
  for (const field of REQUIRED_FIELDS) {
    const value = row[field];
    if (value === undefined || value.trim() === "") {
      errors.push({
        row: rowIndex + 1,
        column: field,
        message: "Este campo es obligatorio",
      });
    }
  }

  
  for (const field of REQUIRED_NUMERIC_FIELDS) {
    const value = row[field];
    if (value !== undefined && value.trim() !== "") {
      const number = Number(value);
      if (!isNumeric(value)) {
        errors.push({
          row: rowIndex + 1,
          column: field,
          message: "Debe ser un número válido",
        });
      } else if (number <= 0) {
        errors.push({
          row: rowIndex + 1,
          column: field,
          message: "Este campo no puede ser negativo ni 0",
        });
      }
    }
  }


  const OPTIONAL_NUMERIC_FIELDS = ["TAMANO", "ENGANCHE", "MENSUALIDAD"];
  for (const field of OPTIONAL_NUMERIC_FIELDS) {
    const value = row[field];
    if (value !== undefined && value.trim() !== "") {
      const number = Number(value);
      if (!isNumeric(value)) {
        errors.push({
          row: rowIndex + 1,
          column: field,
          message: "Debe ser un número válido",
        });
      } else if (number <= 0) {
        errors.push({
          row: rowIndex + 1,
          column: field,
          message: "Este campo no puede ser negativo ni 0",
        });
      }
    }
  }

  
  const fechaDisponibilidad = row["FECHA_DISPONIBILIDAD (DD/MM/AAAA)"];
  if (!fechaDisponibilidad || fechaDisponibilidad.trim() === "") {
    errors.push({
      row: rowIndex + 1,
      column: "FECHA_DISPONIBILIDAD (DD/MM/AAAA)",
      message: "Este campo es obligatorio",
    });
  } else if (!isValidDate(fechaDisponibilidad)) {
    errors.push({
      row: rowIndex + 1,
      column: "FECHA_DISPONIBILIDAD (DD/MM/AAAA)",
      message: "Formato de fecha inválido (DD/MM/AAAA)",
    });
  }

  
  const fechaConstruccion = row["FECHA_CONSTRUCCION (DD/MM/AAAA)"];
  if (fechaConstruccion && fechaConstruccion.trim() !== "" && !isValidDate(fechaConstruccion)) {
    errors.push({
      row: rowIndex + 1,
      column: "FECHA_CONSTRUCCION (DD/MM/AAAA)",
      message: "Formato de fecha inválido (DD/MM/AAAA)",
    });
  }


  const etiquetas = row["ETIQUETAS (separadas por diagonal '/')"];
  if (etiquetas && etiquetas.trim() !== "" && !isValidTags(etiquetas)) {
    errors.push({
      row: rowIndex + 1,
      column: "ETIQUETAS (separadas por diagonal '/')",
      message: "Solo letras y '/' son permitidos",
    });
  }

 
  const descripcion = row["DESCRIPCION"];
  if (!isValidStringLength(descripcion, 500)) {
    errors.push({
      row: rowIndex + 1,
      column: "DESCRIPCION",
      message: "Máximo 500 caracteres",
    });
  }


  for (const field of CSV_FIELDS) {
    if (
      !["DESCRIPCION", ...REQUIRED_NUMERIC_FIELDS, ...OPTIONAL_NUMERIC_FIELDS, ...DATE_FIELDS, "ETIQUETAS (separadas por diagonal '/')"].includes(field)
    ) {
      const value = row[field];
      if (value !== undefined && value.trim() !== "" && !isValidStringLength(value, 100)) {
        errors.push({
          row: rowIndex + 1,
          column: field,
          message: "Máximo 100 caracteres",
        });
      }
    }
  }

  return errors;
};


const formatRow = (row: RawProperty) => {
  return {
    address: row["DIRECCION"],
    availabilityDate: parseDateToTimestamp(row["FECHA_DISPONIBILIDAD (DD/MM/AAAA)"]),
    bathrooms: Number(row["NUMERO_BANOS"]),
    bedrooms: Number(row["NUMERO_HABITACIONES"]),
    dateConstruction: parseDateToFullTimestamp(row["FECHA_CONSTRUCCION (DD/MM/AAAA)"]),
    description: limitDescriptionLength(row["DESCRIPCION"]),
    hitch: Number(row["ENGANCHE"]),
    image: row["IMAGEN (url)"],
    link: row["URL"],
    location: row["CIUDAD"], 
    lotSize: Number(row["TAMANO"]),
    monthlyPayment: Number(row["MENSUALIDAD"]),
    price: Number(row["PRECIO"]),
    status: "published",
    tags: row["ETIQUETAS (separadas por diagonal '/')"]?.split("/") ?? [],
    title: row["NOMBRE"],
    type: row["TIPO"],
  };
};



const parseDateToTimestamp = (dateStr: string | undefined): number | null => {
  if (!dateStr || !isValidDate(dateStr)) return null;
  const [day, month, year] = dateStr.split("/");
  const parsedDate = new Date(`${year}-${month}-${day}`);
  return Math.floor(parsedDate.getTime() / 1000);
};

const parseDateToFullTimestamp = (dateStr: string | undefined): number | null => {
  if (!dateStr || !isValidDate(dateStr)) return null;
  const [day, month, year] = dateStr.split("/");
  const parsedDate = new Date(`${year}-${month}-${day}`);
  return parsedDate.getTime();
};

const handleCSVUpload = async (file: File) => {
  const data = await parseCSV(file);

  const allErrors: ValidationError[] = [];
  const validRows: any[] = [];

  data.forEach((row, index) => {
    const errors = validateRow(row, index);
    if (errors.length > 0) {
      allErrors.push(...errors);
    } else {
      const formatted = formatRow(row);
      validRows.push(formatted);
    }
  });

  if (allErrors.length > 0) {
    throw new Error("Se encontraron errores en el CSV. Revisa la consola para más detalles.");
  }

  return validRows;
};

export default handleCSVUpload;
