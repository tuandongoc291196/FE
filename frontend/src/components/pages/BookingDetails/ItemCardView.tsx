import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Rating,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
export interface VenueCardProps {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  promotion?: number;
  rating: number;
  location: string;
}

const ItemCardView: React.FC<VenueCardProps> = ({
  imageUrl,
  title,
  price,
  description,
  promotion,
  rating,
  location,
}) => {
  return (
    <Card sx={{ display: 'flex', margin: '20px' }} elevation={3}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={imageUrl}
        alt={title}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          textAlign: 'left',
        }}
      >
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
                  value={rating}
                  readOnly
                  precision={0.1}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography
                  color="text.secondary"
                  sx={{ marginLeft: '5px' }}
                  fontSize={14}
                  fontWeight={500}
                >
                  {rating}
                </Typography>
              </Box>
              <Typography mt={3} fontSize={14} fontWeight={600}>
                Giá: {price.toLocaleString()} VNĐ
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={12}
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4,
                  textOverflow: 'ellipsis',
                }}
              >
                {description}
              </Typography>
              {promotion && (
                <Typography mt={1} fontSize={14} fontWeight={500} color={'red'}>
                  Khuyến mãi: {promotion}%
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ItemCardView;
