import React, { useMemo } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Rating from '@mui/material/Rating';

interface PropertyCardProps {
  title: string;
  price: number;
  tags?: string[];
  bathrooms: number;
  bedrooms: number;
  image: string;
  link: string;
  reason: string;
  rate: number; 
}

const PropertyCard = React.memo(({ 
  title,
  price,
  tags,
  bathrooms,
  bedrooms,
  image,
  link,
  reason,
  rate
}: PropertyCardProps) => {

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }, [price]);

  const maxVisibleTags = 5;
  const visibleTags = tags?.slice(0, maxVisibleTags);
  const hiddenTagsCount = (tags?.length ?? 0) - maxVisibleTags;
  const hiddenTags = tags?.slice(maxVisibleTags);
  const ratingValue = useMemo(() => (rate / 100) * 5, [rate]);

  return (
    <Card sx={{ width: "316px", borderRadius: 2, boxShadow: 3, margin: "8px", position: 'relative' }}>
      
      <Tooltip title={reason}>
        <IconButton 
          sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', backgroundColor: '#0657a0' }}
        >
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>

      <CardMedia
        component="img"
        height="140px"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Precio:</strong> <span style={{ fontSize: '1.2em', fontFamily: '"Impact", Charcoal, sans-serif' }}>{formattedPrice}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>No. de Habs:</strong> <span style={{ fontSize: '1.2em', fontFamily: '"Impact", Charcoal, sans-serif' }}>{bedrooms}</span>, <strong>No. de Baños:</strong> <span style={{ fontSize: '1.2em', fontFamily: '"Impact", Charcoal, sans-serif' }}>{bathrooms}</span>
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          <strong>% de Recomendación:</strong>
        </Typography>
        <Rating value={ratingValue} precision={0.5} readOnly />

         <Box mt={1}>
          {visibleTags?.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ marginRight: 0.5, marginBottom: 0.5, backgroundColor: "#b0e9fe" }} />
          ))}
          {hiddenTagsCount > 0 && (
            <Tooltip title={hiddenTags?.join(', ')}>
              <Chip label={`${hiddenTagsCount}+`} sx={{ marginRight: 0.5, marginBottom: 0.5, backgroundColor: "#b0e9fe" }} />
            </Tooltip>
          )}
        </Box> 
        
        <Button 
          variant="contained" 
          href={link} 
          target="_blank" 
          sx={{ 
            marginTop: 2, 
            color: "#d9e0e7", 
            backgroundColor: "#0657a0",
            '&:hover': {
              backgroundColor: "#16283b",
            }
          }}
          fullWidth
        >
          Abrir
        </Button>
      </CardContent>
    </Card>
  );
});

export default PropertyCard;
