import { Box, Typography } from '@mui/material';
import { IconType } from "react-icons";
import { Link } from '@mui/material'

interface Method {
  value: string;
  href: string;
}

interface ContactMethodProps {
  typeContact: string;
  methods: Method[];
  icon: IconType;
  target?: string;
}

function ContactMethod({ typeContact, methods, icon: Icon, target = "_self" }: ContactMethodProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: '1.1rem',
        textAlign: { xs: 'center', md: 'start' },
      }}>
      
      <Box
        sx={{
          bgcolor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '3.1rem',
          height: '3.1rem',
          borderRadius: '50%'
        }}>
        <Icon size={'1.75rem'} color="#16273B" />
      </Box>

      <Box>
        <Typography variant="h6" sx={{color:'#fff'}}>{typeContact}</Typography>
        {methods.map((method, index) => (
          <Link sx={{textDecoration:'none', color:'#fff'}} key={index}  href={method.href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
            <Typography
              sx={{
                fontWeight: '300',
                lineHeight:'1.75',
                '&:hover': { color: '#B0E9FD' },
              }}
              variant="subtitle1">
              {method.value}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default ContactMethod;
