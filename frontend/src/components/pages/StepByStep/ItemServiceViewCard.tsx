import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton, Box, Grid, Chip, Rating } from '@mui/material';
import { Star, FavoriteBorder, People } from '@mui/icons-material';
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from 'react-router';
import RequestPricePopup from '../Popup/Couple/RequestPricePopup';

interface VenueCardProps {
  imageUrl: string;
  title: string;
  location: string;
  rating: number;
  price: string;
  description: string;
}

const ItemServiceViewCard: React.FC<VenueCardProps> = ({ imageUrl, title, location, rating, price, description }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ display: 'flex', margin: '20px',}} elevation={3}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={imageUrl}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Grid container alignItems="top" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" color="text.secondary">
                {location}
              </Typography>
              <Typography component="div" variant="h4" fontWeight={600}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'bottom' }}>
              <Rating
                    name="text-feedback"
                    value={3}
                    readOnly
                    precision={0.1}
                    size="large"
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                <Typography color="text.secondary" sx={{ marginLeft: '5px' }} fontSize={14} fontWeight={500}>
                  5.0
                </Typography>
              </Box>
              <Typography color="text.secondary" fontSize={12} sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 5, 
                  textOverflow: 'ellipsis',
                }}>
                {description}
              </Typography>
              
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{px: 4,py:1, mb:1,mr:1, fontSize: 14, fontWeight: 600}} style={{ backgroundColor: 'var(--primary-color)'}}
        onClick={() => {
          if (price !== "") {
              navigate(`/quotation`);
          } else {
                setOpen(true)
          }
        }}
        >
        {price === "" ? "Giá liên hệ" : price}
        </Button>
        <RequestPricePopup open={open} handleClose={handleClose} 
        serviceId=""
        serviceName=""
        suplierID=''
        />
        </CardActions>
      </Box>
    </Card>
  );
};

export default ItemServiceViewCard;
