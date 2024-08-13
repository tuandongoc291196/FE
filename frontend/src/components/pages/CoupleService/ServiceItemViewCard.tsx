import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import RequestPricePopup from '../Popup/Couple/RequestPricePopup';
import { addToCart } from '../../../utils/CartStorage';

interface ServiceItemViewCardProps {
  id: string;
  imageUrl: string;
  location: string;
  title: string;
  ratingValue: number;
  description: string;
  type: string;
  price: number;
  suplierID: string;
}

const ServiceItemViewCard: React.FC<ServiceItemViewCardProps> = ({
  id,
  imageUrl,
  location,
  title,
  ratingValue,
  description,
  type,
  price,
  suplierID,
}) => {
  const navigate = useNavigate();

  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);

  return (
    <li className="content-item">
      <div className="content-gallery">
        <img src={imageUrl} alt="" />
      </div>
      <div className="content-infor">
        <div className="item-subtitle">
          <div className="item-location">{location}</div>
        </div>
        <h2
          className="item-title"
          onClick={() => {
            navigate(`/services/details/${id}`);
          }}
        >
          {title}
        </h2>

        <div className="item-subtitle">
          <div className="item-rating-star">
            <Rating
              name="text-feedback"
              value={ratingValue}
              readOnly
              precision={0.1}
              size="large"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
          <div className="item-rating">{ratingValue.toFixed(1)}</div>
        </div>
        <Chip
          label={type === 'LUXURY' ? 'Cao cấp' : 'Phổ thông'}
          color={type === 'LUXURY' ? 'secondary' : 'warning'}
          sx={{ width: 80, fontSize: 10, fontWeight: 600 }}
          size="small"
        />

        <p className="item-description">
          <span>{description}</span>
        </p>
        <div className="item-footer">
          <Button
            className="btn-item"
            sx={{ minWidth: 200 }}
            style={{ backgroundColor: 'var(--primary-color)' }}
            variant="contained"
            onClick={() => {
              addToCart({
                id: id,
                image: imageUrl,
                name: title,
                price: price,
                promotion: 0,
                quantity: 1,
              });
              window.location.href = '/quotation';

              // navigate(`/quotation`);
            }}
          >
            {price.toLocaleString('vi-VN')} VND
          </Button>
          {/* <RequestPricePopup open={open} handleClose={handleClose}
          serviceId={id}
          serviceName={title}
          suplierID={suplierID}
          /> */}
        </div>
      </div>
    </li>
  );
};

export default ServiceItemViewCard;
