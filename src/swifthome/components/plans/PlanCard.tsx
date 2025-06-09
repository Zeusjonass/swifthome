import React from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

interface PlanCardProps {
  name: string;
  monthlyPrice: string;
  totalPrice: string;
  users: string;
  clase: string;
  additionalText?: string;
  selected?: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}

const PlanCard: React.FC<PlanCardProps> = ({ name, monthlyPrice, totalPrice, users, clase, additionalText, selected, onSelect, children }) => {
  return (
    <Card
    raised
    className={clase}
    onClick={onSelect}
    sx={{
      borderRadius: '0.5rem',
      borderWidth: '1px',
      borderColor: 'rgba(245, 245, 245, 1)',
      boxShadow: selected ? '0 0 18px hsla(0, 0%, 50%, .5)': '0 0 7px hsla(0, 0%, 50%, .5)',
      cursor: 'pointer',
      backgroundColor: selected ? '#16273B' : '#fff',
      color: selected ? '#fff' : '#000',
      transition: 'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
      transform: selected ? 'scale(1.02)' : 'none',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 0 18px hsla(0, 0%, 50%, .5)',
    },
  }}>
      <CardContent sx={{padding:'2.5rem', textAlign:'center'}}>
        <Typography component="p" 
         sx={{
            color: selected ?'#fff':'rgba(17, 24, 39, 1)', 
            fontSize:'1.25rem', 
            fontWeight:selected ?'400':'500'}}>
          {name}
        </Typography>
        {additionalText ? (
          <Typography component="p" sx={{
            color:selected ?'#fff':'rgba(107, 114, 128, 1)',
            fontWeight:selected ?'200':'400'}}>
            {additionalText}
          </Typography>
        ) : (
          <>
          <Typography component="p">
              <Typography component="span" sx={{
                color: selected ?'#fff':'rgba(17, 24, 39, 1)',
                fontWeight:selected ?'400':'600',
                fontSize:'2.25rem'
              }}> {monthlyPrice}
              </Typography>
              <Typography component="span" sx={{
                color:selected ?'#fff':'rgba(107, 114, 128, 1)',
                fontSize:'1.0625rem',
                fontWeight: selected ? '200':'400'
                }}>/mes
              </Typography>
          </Typography>

            <Typography component="p">
              <Typography component="span" sx={{
                color:selected ?'#fff':'rgba(107, 114, 128, 1)',
                fontWeight:selected ?'300':'400'
                }}>
                {"El precio total es de "+totalPrice+" MXN"}
              </Typography>
            </Typography>
          </>
        )}
        <Typography component="p" 
        sx={{ 
            mt: 1.5, 
            fontWeight:selected ?'300':'400', 
            color: selected ?'#fff':'rgba(17, 24, 39, 1)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            gap:'0.45rem'
            }}>
          <Typography component="span">{parseInt(users)>1?<GroupIcon/>:<PersonIcon/>}</Typography>
          <Typography component="span">{`${users} ${parseInt(users)>1?"usuarios":"usuario"}`} </Typography>
        </Typography>
        <Box sx={{width:'100%',display:'flex',justifyContent:'center', mt:'0.625rem'}}>{children}</Box>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
