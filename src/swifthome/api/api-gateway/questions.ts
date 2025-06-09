import { useQuery, UseQueryResult } from 'react-query';
import { Question } from '../../types/question';
import axiosInstance from './_axiosConfig';

const fetchQuestionsByUserId = async (userId: string): Promise<Question[]> => {
  const response = await axiosInstance.post('/getCustomQuestions', { userId });
  return response.data;
};

export const useQuestionsByUserIdQuery = (userId: string): UseQueryResult<Question[], Error> => {
  return useQuery(['questions', userId], () => fetchQuestionsByUserId(userId), {
    enabled: !!userId,
  });
};

const fetchAllQuestions = async (): Promise<Question[]> => {
  const response = await axiosInstance.post('/getAllQuestions', {});
  return response.data;
};

export const useGetAllQuestionsQuery = (): UseQueryResult<Question[], Error> => {
  return useQuery(['all questions'], () => fetchAllQuestions(), {
  });
};


export type InitializeUserQuestionsRequest = {
  userId: string;
  questionIds: string[];
}

export const initializeUserQuestions = async (request: InitializeUserQuestionsRequest): Promise<Question[]> => {
  const response = await axiosInstance.post('/createUserQuestions', request);
  return response.data;
};
