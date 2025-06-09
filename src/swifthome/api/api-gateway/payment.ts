import { useMutation, UseMutationResult } from 'react-query';
import axiosInstance from './_axiosConfig';

export type CreatePaymentSessionResponse = {
  sessionId: string;
};

export const createPaymentSession = async (
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  quantity?: number
): Promise<CreatePaymentSessionResponse> => {
  const response = await axiosInstance.post<CreatePaymentSessionResponse>(
    '/processPayment',
    {
      priceId,
      successUrl,
      cancelUrl,
      quantity,
    }
  );
  return response.data;
};

export const useCreatePaymentSessionMutation = (): UseMutationResult<
  CreatePaymentSessionResponse,
  Error,
  { priceId: string; successUrl: string; cancelUrl: string, quantity?: number }
> => {
  return useMutation(({ priceId, successUrl, cancelUrl, quantity }) =>
    createPaymentSession(priceId, successUrl, cancelUrl, quantity)
  );
};
