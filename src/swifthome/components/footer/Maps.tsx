import { Box } from '@mui/material';
function Maps() {
  return (
    <Box sx={{ height: { xs: '40vh', lg: '55vh' } }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29809.861905192978!2d-89.6403571526855!3d20.943166703468005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5672367ac3a807%3A0x8bc90928ba403417!2sC.%2099%20710%2C%20Manzana%20115%2C%2097267%20M%C3%A9rida%2C%20Yuc.!5e0!3m2!1ses-419!2smx!4v1731514977786!5m2!1ses-419!2smx"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
    </Box>
  )
}

export default Maps