import { Box, Typography } from '@mui/material';
import ContactMethod from './ContactMethod';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSmartphone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import ContactForm from './ContactForm';

function ContactInfo() {
    return (
        <Box id='contact' sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-evenly',
            alignItems: { xs: 'center', md: 'flex-start' },
            backgroundColor: '#16273B',
            paddingBlock: '4rem',
            gap: { xs: '5rem', md: '0' }
        }} >

            <Box sx={{ width: { xs: '80%', md: '45%', lg: '35%' }, color:'#fff', textAlign: { xs: 'center', md: 'start' } }}>
                <Typography sx={{ mb: "1.2rem", fontSize: '1.8rem' }}>Nosotros</Typography>
                <Typography variant='subtitle1' sx={{ mb: '0.5rem' }}>Ayudamos a las pymes en su proceso de transformación digital.</Typography>
                <Typography variant='subtitle1'>¡Déjanos ayudarte a transformarte!</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.1rem', mt: '2rem' }}>
                     
                     <ContactMethod
                        typeContact="Ubicación"
                        methods={[ {value: "Calle 99, #710. Col.Manzana 115, Mérida, Yucatán.", 
                                    href: "https://www.google.com/maps?ll=20.930844,-89.641447&z=13&t=m&hl=es-419&gl=MX&mapclient=embed&q=C.+99+710+Manzana+115+97267+M%C3%A9rida,+Yuc." },]}
                        icon={FaLocationDot}
                        target='_blank' />

                    <ContactMethod
                        typeContact="Teléfono"
                        methods={[ {value: "+52 999 504 1015", href: "https://wa.me/5219995041015" }]}
                        icon={MdOutlineSmartphone}
                        target='_blank' /> 

                    <ContactMethod
                        typeContact="Correo electrónico"
                        methods={[
                        {value:"contacto@deux.mx", href:"mailto:contacto@deux.mx" }]}
                        icon={MdEmail} />
                </Box>
            </Box>

            <Box sx={{ width: { xs: '80%', md: '35%' }, textAlign: { xs: 'center', md: 'start' } }}>
                <Typography sx={{ mb: '1.2rem', fontSize: '1.8rem', color:'#fff' }}>Contáctanos</Typography>
                <ContactForm />
            </Box>
        </Box>
    )
}
export default ContactInfo
