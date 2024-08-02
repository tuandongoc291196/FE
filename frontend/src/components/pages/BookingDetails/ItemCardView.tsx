import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton, Box, Grid, Chip, Rating } from '@mui/material';
import { Star, FavoriteBorder, People } from '@mui/icons-material';
import StarIcon from "@mui/icons-material/Star";

export interface VenueCardProps {
  imageUrl: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  capacity: number;
}

const ItemCardView: React.FC<VenueCardProps> = ({ imageUrl, title, location, rating, reviews, description, features, capacity }) => {
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
              <Typography variant="h6" color="text.secondary">
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
              <Typography fontSize={14} fontWeight={600}>
                Giá: {capacity}
              </Typography>
              <Typography color="text.secondary" fontSize={12} sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4, 
                  textOverflow: 'ellipsis',
                }}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ItemCardView;
