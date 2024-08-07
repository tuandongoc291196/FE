import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { getCart, removeFromCart } from '../../../utils/CartStorage';
import { useSelector } from 'react-redux';
import FormBooking from './FormBooking';

const CoupleQuotation: React.FC = () => {
  const navigate = useNavigate();
  const [servicesPrice, setServicePrice] = useState(getCart());
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setServicePrice(getCart());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [getCart()]);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    setServicePrice(getCart());
  };
  const totalPrice = servicesPrice.reduce((total, product) => {
    const price = product.price ?? 0;
    return total + 1 * price;
  }, 0);

  const totalPromotionPrice = servicesPrice.reduce((total, product) => {
    const price = product.price ?? 0;
    const promotion = product.promotion ?? 0;
    const serviceTotalPrice = 1 * price;
    const serviceTotalPriceWithPromotion =
      serviceTotalPrice * (promotion / 100);
    return total + serviceTotalPriceWithPromotion;
  }, 0);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        my={2}
        fontWeight={600}
        sx={{ textTransform: 'uppercase', color: 'var(--primary-color)' }}
      >
        <Divider
          sx={{
            mx: 'auto',
            width: 500,
            '&::before, &::after': {
              borderColor: 'var(--primary-color)',
              borderWidth: '1px',
            },
          }}
        >
          Danh sách dịch vụ
        </Divider>
      </Typography>
      <TableContainer elevation={4} sx={{ my: 4 }} component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                Hình ảnh
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                Giá bán
              </TableCell>

              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                Khuyến mãi
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                Thành tiền
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                Xóa
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesPrice.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell sx={{ fontSize: 14 }}>{index + 1}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    sx={{ borderRadius: '8px' }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 550 }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>
                  {product.price.toLocaleString()} VND
                </TableCell>

                <TableCell sx={{ fontSize: 14, fontWeight: 550 }}>
                  {product.promotion ?? 0}%
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>
                  {(
                    product.price -
                    (product.price * (product.promotion ?? 0)) / 100
                  ).toLocaleString()}{' '}
                  VND
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveFromCart(product.id)}>
                    <DeleteIcon sx={{ fontSize: 30, color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="h5">
          Tổng cộng:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {totalPrice.toLocaleString('vi-VN')} VND
          </Box>
        </Typography>
        <Typography variant="h5">
          Giảm giá khuyến mãi:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            -{totalPromotionPrice.toLocaleString('vi-VN')} VND
          </Box>
        </Typography>
        <Typography my={2} variant="h5">
          Tổng thanh toán:{' '}
          <Box component="span" sx={{ color: 'green', fontWeight: 'bold' }}>
            {(totalPrice - totalPromotionPrice).toLocaleString('vi-VN')} VND
          </Box>
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2, px: 4, py: 1, fontSize: 14, fontWeight: 600 }}
            onClick={() => navigate(-1)}
          >
            Tiếp tục mua hàng
          </Button>
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: 'var(--primary-color)',
              color: 'white',
            }}
            disabled={servicesPrice.length === 0}
            onClick={() => setModalOpen(true)}
          >
            Hoàn tất đơn hàng
          </Button>
        </Box>
      </Box>
      <FormBooking
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        services={servicesPrice}
        totalPrice={totalPrice}
        totalPromotionPrice={totalPromotionPrice}
      />
    </Box>
  );
};

export default CoupleQuotation;
