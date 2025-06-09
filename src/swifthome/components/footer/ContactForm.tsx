import { GoArrowUpRight } from "react-icons/go";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled, keyframes, TextField, TextareaAutosize, Typography,CircularProgress } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useState } from "react";

function ContactForm() {

  const [isLoading, setisLoading] = useState(false)

  const CustomTextField = styled(TextField)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(5px)",
    outline: "none",
    borderRadius: "0.125rem",
    fontSize: "0.95rem",
    border: "none",
    marginTop: "1rem",
    color: "#fff",
    height: "3.5rem",
    display: "flex",
    justifyContent: "center",
    padding: 0,
  
    "& .MuiInputBase-root": {
      background: "transparent", 
      boxShadow: "none", 
      color: "inherit",
      padding: "12px 16px", 
      transition: "box-shadow 0.3s ease-in-out",
    },
  
    "& .MuiInputBase-root.Mui-focused": {
      boxShadow: "0px 1.5px 10px rgba(255, 185, 69, 0.35)",
      borderRadius: "0.125rem",
    },
  
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", 
    },
  
    "& .MuiInputBase-input": {
      padding: 0,
      height: "100%",
    },
  
    "& input::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "0.95rem",
    },
  
    [theme.breakpoints.down("md")]: {
      "& .MuiInputBase-input": {
        textAlign: "center",
      },
    },
  }));
  
  const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(5px)",
    outline: "none",
    borderRadius: "0.125rem",
    fontSize: "0.95rem",
    border: "none",
    marginTop: "1rem",
    color: "#fff",
    height: "3.5rem",
    display: "flex",
    justifyContent: "center",
    padding: "12px 16px",
    resize: "none",
  
    "&:focus": {
      boxShadow: "0px 1.5px 10px rgba(255, 185, 69, 0.35)",
      borderRadius: "0.125rem",
    },
  
    "&:focus::placeholder, &::placeholder": {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: "0.95rem",
    },
  
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));
  
  const ContactForm = styled('form')(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  }));

  const ContactButton = styled('button')(({ theme }) => ({
       textTransform:'capitalize',
       cursor:'pointer',
       borderRadius: '0.125rem',
       padding: '0.75rem',
       width: '35%',
       backgroundColor: '#0957A0',
       color: '#fff',
       fontWeight: 500,
       border: 0,
       outline: 0,
       fontSize: '1rem',
       marginTop: '1rem',
       display: 'flex',
       justifyContent: 'center',
       gap: '0.5rem',
       boxShadow: '0px 3px 20px rgba(255, 185, 69, 0.35)',
       transition: 'all 0.4s ease-out',
       '&:hover': {
         backgroundColor: '#0A6FC0',
       },
       [theme.breakpoints.down('md')]: {
         width: '100%',
       },
  }));
  
    const errorsAnimation = keyframes`
      from {
        opacity: 0;
        transform: translateY(-0.32rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      } `;

    const ErrorMessage = styled('span')(() => ({
        paddingLeft: '0.1rem',
        lineHeight: 1.5715,
        fontSize: '0.875rem',
        color: '#ef5771',
        animation: `${errorsAnimation} 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)`,
      
      }));

  const schema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por favor, escribe el nombre")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(70, "El nombre debe tener maximo 70 caracteres"),

    correo: Yup.string()
      .required("Por favor, escribe el correo")
      .email("Por favor introduce un formato de correo válido"),

    telefono: Yup.string()
      .required("Por favor, escribe el número de teléfono")
      .matches(/^[0-9]+$/, "El número de teléfono solo debe contener dígitos")
      .min(10, "El número de teléfono debe tener al menos 10 dígitos")
      .max(15, "El número de teléfono debe tener como máximo 15 dígitos"),

    mensaje: Yup.string()
      .required("Por favor, escribe el mensaje")
      .min(10, "El mensaje debe tener al menos 10 caracteres"),

  });

  interface FormData {
    nombre: string;
    correo: string;
    telefono: string;
    mensaje: string;
  }

  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });

  type KeysID = {
    service_id: string | undefined;
    template_id: string | undefined;
    public_key: string | undefined;
  };
  const keysID:KeysID =  {
    service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    public_key: process.env.NEXT_PUBLIC_EMAILJS_API_KEY
  }

  const {service_id,template_id,public_key} = keysID

  if (!service_id || !template_id || !public_key) {
    throw new Error('Missing required environment variables for EmailJS');
  }

  const onSubmit = async (data: FormData) => {
    reset();
    setisLoading(true);
  
    const emailData = {
      user_name: data.nombre,
      user_phone: data.telefono,
      user_email: data.correo,
      message: data.mensaje,
      cc:'jorge@deux.mx,zeus@deux.mx'
    };
  
    try {
      await emailjs.send(service_id, template_id, emailData, public_key);
      setisLoading(false);
    } catch (error) {
      console.log('Error al enviar...', error);
      setisLoading(false);
    }
  };
  
  return (
    <>
      <ContactForm onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField type="text" placeholder='Nombre completo' {...register("nombre")} autoComplete="off" required />
        {errors.nombre && (
          <ErrorMessage>{errors.nombre.message}</ErrorMessage>
        )}

        <CustomTextField type="text" placeholder='Correo electrónico' {...register("correo")} autoComplete="off" required/>
        {errors.correo && (
          <ErrorMessage>{errors.correo.message}</ErrorMessage>
        )}

        <CustomTextField type="tel" autoComplete="off" maxLength={15} placeholder='Teléfono' {...register("telefono")} required/>
        {errors.telefono && (
          <ErrorMessage>{errors.telefono.message}</ErrorMessage>
        )}

        <CustomTextArea sx={{minHeight:'7rem'}} placeholder='Mensaje' {...register("mensaje")} autoComplete="off" required />
        
        {errors.mensaje && (
          <ErrorMessage>{errors.mensaje.message}</ErrorMessage>
        )}

        <ContactButton type="submit" disabled={isLoading}>
          <Typography component="span">{isLoading?"Enviando...":"Enviar"}</Typography>
          <Typography component="span">{isLoading?(<CircularProgress size={"1.5rem"}/>):<GoArrowUpRight size={"1.5rem"} />}</Typography>
        </ContactButton>

      </ContactForm>

    </>
  )
}
export default ContactForm
