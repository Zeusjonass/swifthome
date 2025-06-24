import axiosInstance from './_axiosConfig';
import { Question, Questions } from '../../schemas';
import { isAxiosError } from 'axios';

export const getClientQuestions = async () => {
  try {
    const response = await axiosInstance.post("/getClientQuestions", {
      userId: "f4281488-20b1-7017-61a9-49ef701600a3",
    });
    const data = response.data;

    const parsedData = Questions.parse(data);

    return parsedData;
  } catch (error) {
    throw error;
  }
};

export const updateUserQuestions = async (questions: Question[]) => {
  try {
    const response = await axiosInstance.post("/updateUserQuestions", {
      userId: "f4281488-20b1-7017-61a9-49ef701600a3",
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