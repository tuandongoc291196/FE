import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import {
  cancelBooking,
  getBookingHistoryByCoupleId,
  requestPayment,
} from '../../../redux/apiRequest';
import { BOOKING_STATUS } from '../../../constants/consts';

const BookingHistory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.login.currentUser);
  console.log(data);
  const getData = async () => {
    setLoading(true);
    const res = await getBookingHistoryByCoupleId(user.userId, user.token);
    if (res) {
      const list: any[] = [];
      res.map((booking: any) => {
        booking.listBookingDetail.map((item: any) => {
          list.push(item);
        });
      });
      setData(list);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const remainingPayment = async () => {
    const listBookingIds: string[] = [];
    data.map((item: any) => {
      if (item.status === BOOKING_STATUS.processing)
        listBookingIds.push(item.id);
    });
    const args = { deposit: false, listBookingDetailId: listBookingIds };
    const res = await requestPayment(args, user.token);
    if (res) {
      window.location.href = res;
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const res = await cancelBooking(id, user.token);
    if (res) {
      getData();
    }
  };

  const totalPrice = data?.reduce((total: any, service: any) => {
    if (service.status === BOOKING_STATUS.processing)
      return total + service.price;
    else return total;
  }, 0);
  return (
    <Box p={3}>
      <Typography
        variant="h4"
        my={4}
        fontWeight={600}
        sx={{ textTransform: 'uppercase', color: 'var(--primary-color)' }}
      >
        <Divider
          sx={{
            mx: 'auto',
            width: 700,
            '&::before, &::after': {
              borderColor: 'var(--primary-color)',
              borderWidth: '2px',
            },
          }}
        >
          Đơn hàng
        </Divider>
      </Typography>
      {loading ? (
        <div className="flex h-[50vh] justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableContainer elevation={4} sx={{ mt: 4 }} component={Card}>
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
                    Dịch vụ
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                    }}
                  >
                    Trạng thái
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
                    Số lượng
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                    }}
                  >
                    Hủy
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell sx={{ fontSize: 14 }}>
                        {product?.serviceSupplier.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, fontWeight: 550 }}>
                        {product?.serviceSupplier.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        <Chip
                          label={product.status}
                          sx={{
                            height: '24px',
                            width: '100px',
                            fontSize: 10,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {product?.price.toLocaleString()} VND
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {product?.quantity}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          disabled={
                            product.status !== BOOKING_STATUS.processing
                          }
                          onClick={() => handleDelete(product.id)}
                        >
                          <DeleteIcon
                            sx={{
                              fontSize: 30,
                              color:
                                product.status !== BOOKING_STATUS.processing
                                  ? 'gray'
                                  : 'red',
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            my={2}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography my={1} variant="h5">
              Tổng cộng:{' '}
              <Box component="span" sx={{ color: 'green', fontWeight: 'bold' }}>
                {totalPrice?.toLocaleString()} VND
              </Box>
            </Typography>
            <Typography my={1} variant="h5">
              Đã cọc:{' '}
              <Box component="span" sx={{ color: 'red', fontWeight: 'bold' }}>
                {(totalPrice * 0.2)?.toLocaleString()} VND
              </Box>
            </Typography>
            <Typography my={1} variant="h5">
              Còn lại:{' '}
              <Box component="span" sx={{ color: 'blue', fontWeight: 'bold' }}>
                {(totalPrice - totalPrice * 0.2)?.toLocaleString()} VND
              </Box>
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2, px: 4, py: 1, fontSize: 14, fontWeight: 600 }}
                onClick={() => {
                  navigate('/');
                }}
              >
                Trở về
              </Button>
              <Button
                disabled={totalPrice === 0}
                variant="contained"
                sx={{
                  px: 4,
                  py: 1,
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                }}
                onClick={remainingPayment}
              >
                Tất toán
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BookingHistory;
