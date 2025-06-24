import React from "react";
import Button from "@mui/material/Button";
import { DriveFolderUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import handleCSVUpload from "../utils/handleCSVUpload";
import { useMutation } from "@tanstack/react-query";
import { newProperties } from "../api";
import { useSnackbar } from "notistack";
import { isAxiosError } from "axios";
import { PropertyFormData } from "../schemas";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CSVUploadButton: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: newProperties,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Error al cargar propiedades", {
        variant: "error",
      });
    },
  });

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const validRows = await handleCSVUpload(file);
      mutate(validRows as PropertyFormData[]);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        enqueueSnackbar(error.message || "Error procesando CSV", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error procesando CSV", {
          variant: "error",
        });
      }
    } finally {
      event.target.value = "";
    }
  };

  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      endIcon={<DriveFolderUpload />}
      sx={{ textTransform: "none", borderRadius: "15px" }}
    >
      Cargar CSV
      <VisuallyHiddenInput type="file" accept=".csv" onChange={onFileChange} />
    </Button>
  );
};

export default CSVUploadButton;
