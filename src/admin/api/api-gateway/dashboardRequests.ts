import axiosInstance from './_axiosConfig';
import { DashBoardInfo, PropertyFormData } from '../../schemas';
import { isAxiosError } from 'axios';

export const getDashboardData = async (userId: string) => {
  try {
    const response = await axiosInstance.post('/getPanelInfo', {
      userId
    });
    const data = response.data;

    const parsedData = DashBoardInfo.parse(data);

    return parsedData;
  } catch (error) {
    throw error;
  }
};

export const newProperty = async ({property, clientId}: {property: PropertyFormData, clientId: string}) => {
  try {
    const response = await axiosInstance.post("/addProperty", {
      clientId,
      property,
    });
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error.response?.data || new Error("Ha ocurrido un error al guardar la propiedad");
    }
    throw new Error("Ha ocurrido un error inesperado al guardar la propiedad");
  }
};

export const newProperties = async ({properties, clientId}: {properties: PropertyFormData[], clientId: string}) => {
  try {
    const response = await axiosInstance.post("/addBatchProperties", {
      clientId,
      properties,
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error.response?.data || new Error("Error al guardar las propiedades");
    }
    throw new Error("Error inesperado al guardar las propiedades");
  }
};

export const editProperty = async ({property, clientId}: {property: unknown, clientId: string}) => {
  try {
    const response = await axiosInstance.post("/editProperty", {
      clientId,
      property,
    });
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error.response?.data.error || new Error("Ha ocurrido un error al editar la propiedad");
    }
    throw new Error("Ha ocurrido un error inesperado al editar la propiedad");
  }
};