import axiosInstance from './_axiosConfig';
import { DashBoardInfo, PropertyFormData } from '../../schemas';

export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.post('/getPanelInfo', {
      userId: "f4281488-20b1-7017-61a9-49ef701600a3" //TODO: cambiar esto a dinamico
    });
    const data = response.data;

    const parsedData = DashBoardInfo.parse(data);

    return parsedData;
  } catch (error) {
    throw error;
  }
};

export const newProperty = async (property: PropertyFormData) => {
  try {
    const response = await axiosInstance.post("/addProperty", {
      clientId: "12345",
      property,
    });
    return response.data
  } catch (error: any) {
    throw error.response?.data || new Error("Ha ocurrido un error al guardar la propiedad");
  }
};

export const newProperties = async (properties: PropertyFormData[]) => {
  try {
    const response = await axiosInstance.post("/addBatchProperties", {
      clientId: "12345",
      properties,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Error al guardar las propiedades");
  }
};

export const editProperty = async (property: any) => {
  try {
    const response = await axiosInstance.post("/editProperty", {
      clientId: "12345",
      property,
    });
    return response.data
  } catch (error: any) {
    throw error.response?.data.error || new Error("Ha ocurrido un error al editar la propiedad");
  }
};