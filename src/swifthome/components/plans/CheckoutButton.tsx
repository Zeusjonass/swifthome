import React from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useCreatePaymentSessionMutation } from '../../api/api-gateway/payment';
import { GoArrowUpRight } from "react-icons/go";

const stripePromise = loadStripe('pk_live_51KC7PzIJX7GSzaJvZg7L5025cakxTbUmFvcPpKlvLM2KmSakXGIREfcJSkPC72b6jazXoXUCPSjdCh0ieavXiGTd00CQSfzaO3');

interface CheckoutButtonProps {
  priceId: string;
  quantity?: number; 
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ priceId, quantity }) => {
  const mutation = useCreatePaymentSessionMutation();

  const handleCheckout = async () => {
    try {
      const successUrl = 'https://main.d14hcqy6hwhv8g.amplifyapp.com/login#plans';
      const cancelUrl = 'https://main.d14hcqy6hwhv8g.amplifyapp.com/login#plans';

      const { sessionId } = await mutation.mutateAsync({
        priceId,
        successUrl,
        cancelUrl,
        quantity,
      });

      const stripe = await stripePromise;
      if (stripe && sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error al redirigir a Stripe:', error);
        }
      }
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
    }
  };

  return (
      <Button
        variant="contained"
        onClick={handleCheckout}
        disabled={mutation.isLoading}
        sx={{
          backgroundColor: "#fff",
          color:'#16273B',
          textTransform:'capitalize', 
          fontSize:'1.1rem',
          display:'flex',
          justifyContent:'center',
          gap: '0.4rem',
          marginBlock:'0.625rem',
          transition:'background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
          '&:hover':{
            backgroundColor:'#B0E9FD'
          }
        }}>
        {mutation.isLoading ? <CircularProgress size={24}/> : 'Seleccionar plan'}
        <Typography component="span"><GoArrowUpRight size={'1.5rem'} /></Typography>
      </Button>
  );
};

export default CheckoutButton;
