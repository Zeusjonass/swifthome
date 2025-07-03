import axiosInstance from './_axiosConfig';
import { Question, Questions } from '../../schemas';
import { isAxiosError } from 'axios';

export const getClientQuestions = async (userId: string) => {
  try {
    const response = await axiosInstance.post("/getClientQuestions", {
      userId,
    });
    const data = response.data;

    const parsedData = Questions.parse(data);

    return parsedData;
  } catch (error) {
    throw error;
  }
};

export const updateUserQuestions = async ({ questions, userId }: { questions: Question[]; userId: string; }) => {
  try {
    const response = await axiosInstance.post("/updateUserQuestions", {
      userId,
      questions,
    });
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data || new Error("Ha ocurrido un error al editar las preguntas");
    }
    throw new Error("Ha ocurrido un error inesperado al editar las preguntas");
  }
};