import { AnsweredQuestion } from '../../types/question';
import axiosInstance from './_axiosConfig';

export type InitializeAssistantRequest = {
  clientId: string;
  userId: string;
  answeredQuestions: AnsweredQuestion[];
}

export type InitializeAssistantResponse = {
  clientId: string;
  sessionId: string;
}

export type PostAssistantNewMessageRequest = {
  sessionId: string;
  message: string;
  clientId: string;
  userId: string;
}

export type PostAssistantNewMessageResponse = {
  initialText: string;
  properties: any[];
  finalText: string;
}

export const initializeAssistantByUserId = async (request: InitializeAssistantRequest): Promise<InitializeAssistantResponse> => {
  const response = await axiosInstance.post('/initializeAssistantV3', request);
  return response.data;
};

export const postAssistantNewMessage = async (request: PostAssistantNewMessageRequest): Promise<PostAssistantNewMessageResponse> => {
  const response = await axiosInstance.post('/newMessageV3', request);
  console.log(response)
  return response.data;
};
