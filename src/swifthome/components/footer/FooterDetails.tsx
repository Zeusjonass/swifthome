import { Box, Typography } from '@mui/material';
import facebook from '../../icons/facebook.svg'
import whatsapp from '../../icons/whatsApp.svg'
import linkedin from '../../icons/linkedin.svg'
import instagram from '../../icons/instagram.svg'

function FooterDetails() {

  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: '#16273B',
        color: '#B0E9FD',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '45vh'
      }}>

      <Box sx={{
        width: { xs: '90%', md: '100%' },
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingBlock: { xs: '3rem', md: '2rem' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: '1.5rem', md: '0' },
      }}>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column', justifyContent: 'center',
          width: { xs: '100%', md: '20%' }, textAlign: { xs: 'center', md: 'start' },
          gap: { xs: '0.75rem', md: '1rem' },
          color:'#fff'
        }}>
          <Typography sx={{ fontWeight: '300' }}>Ayudamos a las pymes en su proceso de transformación digital</Typography>
          <Typography sx={{ fontWeight: '300' }}>¡Déjanos ayudarte a transformarte!</Typography>
        </Box>

        <Box sx={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-start', textAlign: { xs: 'center', md: 'start' }
        }}>

          <Typography variant='h6' sx={{ mb: { xs: '0.5rem', md: '0.75rem' }, color:'#fff' }}>Links Rápidos</Typography>
          
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: '0.25rem',
            '& a': {
              textDecoration: 'none',
              lineHeight: '1.75',
              fontSize: '1rem',
              color: '#fff',
              fontWeight: '300',
              width: 'fit-content',
              '&:hover': {
                color: '#B0E9FD'
              }
            }
          }}>
            <a href="#">Home</a>
            <a href="https://deux.mx/">About Us</a>
          </Box>
        </Box>


        <Box sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          textAlign: { xs: 'center', md: 'start' }
        }}>

          <Typography variant='h6' sx={{ mb: { xs: '0.5rem', md: '0.75rem' }, color:'#fff' }}>Contact Us</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: '0.25rem',
            '& a': {
              textDecoration: 'none',
              lineHeight: '1.75',
              fontSize: '1rem',
              color: '#fff',
              fontWeight: '300',
              width: 'fit-content',
              '&:hover': {
                color: '#B0E9FD'
              }}}}>

            <a target='_blank' href="https://www.google.com/maps?ll=20.930844,-89.641447&z=13&t=m&hl=es-419&gl=MX&mapclient=embed&q=C.+99+710+Manzana+115+97267+M%C3%A9rida,+Yuc.">
              Calle 99, #710. Col.Manzana 115, Mérida, Yucatán.</a>
            <a href="https://wa.me/5219995041015" target='_blank'>+52 999 504 1015</a>
            <a href="mailto:contacto@deux.mx">contacto@deux.mx</a>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: { xs: 'center', md: 'start' } }}>
          <Typography variant='h6' sx={{ mb: { xs: '0.5rem', md: '0.75rem' }, color:'#fff' }}>Follow Us</Typography>
          <Box sx={{
            display: 'flex',
            gap: '0.50rem',
            justifyContent: 'center',
            '& a': {
              transition: 'all .4s ease-out',
              borderRadius: '50%',
              '&:hover': { bgcolor: '#0957A0' }
            }
          }}>
            <a href="#"><img src={facebook} alt="icono facebook" /></a>
            <a href="#"><img src={whatsapp} alt="icono whatsapp" /></a>
            <a href="#"><img src={instagram} alt="icono instagram" /></a>
            <a href="#"><img src={linkedin} alt="icono linkedin" /></a>
          </Box>
        </Box>

      </Box>

      <Typography
      variant="body2"
      sx={{
        paddingBlock: '1.5rem',
        borderTop: '1.5px solid #77777733',
        width: '100%',
        fontWeight: '300',
        fontSize: '1rem',
        color: '#fff',
      }}
    >
      © {currentYear} SwiftHome. All rights reserved.
    </Typography>
    </Box>
  )
}

export default FooterDetails
