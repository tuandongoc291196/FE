import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ItemCardView from './ItemCardView';
import { useNavigate, useParams } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import { getCart } from '../../../utils/CartStorage';
import {
  getBookingById,
  getUserById,
  requestPayment,
} from '../../../redux/apiRequest';
import { useSelector } from 'react-redux';
import { BOOKING_STATUS } from '../../../constants/consts';
import { Email } from '@mui/icons-material';

interface OrderFormProps {
  // Props có thể nhận thêm từ bên ngoài nếu cần
}

const BookingDetails: React.FC<OrderFormProps> = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const [detail, setDetail] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  const navigate = useNavigate();
  const getBookingDetails = async (bookingId: string) => {
    setLoading(true);

    const res = await getBookingById(bookingId, user.token);
    if (res) setDetail(res);
  };
  const getUserData = async () => {
    const res = await getUserById(user.userId, user.token);
    if (res) setUserData(res);
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getBookingDetails(id);
      getUserData();
    }
  }, []);
  useEffect(() => {}, []);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'BO',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const depositPayment = async () => {
    const listBookingIds: string[] = detail.listBookingDetail
      .filter((item: any) => item.status === BOOKING_STATUS.approved)
      .map((item: any) => item.id);
    const args = { deposit: true, listBookingDetailId: listBookingIds };
    const res = await requestPayment(args, user.token);
    if (res) {
      window.location.href = res;
    }
  };

  const servicesRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (servicesRef.current) {
      setIsDragging(true);
      setStartY(e.pageY - servicesRef.current.offsetTop);
      setScrollTop(servicesRef.current.scrollTop);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && servicesRef.current) {
      e.preventDefault();
      const y = e.pageY - servicesRef.current.offsetTop;
      const walk = (y - startY) * 1;
      servicesRef.current.scrollTop = scrollTop - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  const approvedItems = detail?.listBookingDetail?.filter(
    (item: any) => item.status === BOOKING_STATUS.approved
  );
  console.log(approvedItems);
  const totalPrice =
    approvedItems?.reduce((sum: number, item: any) => {
      return sum + item?.price;
    }, 0) || 0;

  return (
    <Box sx={{ mt: 5, marginX: 10 }}>
      <Typography
        variant="h2"
        sx={{
          textTransform: 'uppercase',
          color: 'var(--primary-color)',
          fontWeight: 600,
        }}
      >
        <Divider
          sx={{
            mx: 'auto',
            width: 1000,
            '&::before, &::after': {
              borderColor: 'var(--primary-color)',
              borderWidth: '1px',
            },
          }}
        >
          Hoàn tất đơn hàng
        </Divider>
      </Typography>
      {loading ? (
        <div className="flex h-[50vh] justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid container mt={4} spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" mb={2}>
              Danh sách dịch vụ
            </Typography>
            <Box
              ref={servicesRef}
              sx={{
                height: '70vh',
                overflowY: 'auto',
                cursor: 'grab',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {detail?.listBookingDetail?.length > 0 &&
                detail.listBookingDetail
                  .filter(
                    (item: any) => item.status === BOOKING_STATUS.approved
                  )
                  .map((item: any) => (
                    <ItemCardView
                      key={item.id}
                      location={
                        item.serviceSupplier.supplierResponse.area.ward +
                        ', ' +
                        item.serviceSupplier.supplierResponse.area.district +
                        ', ' +
                        item.serviceSupplier.supplierResponse.area.province
                      }
                      imageUrl={item.serviceSupplier.listImages[0]}
                      title={item.serviceSupplier.name}
                      description={item.serviceSupplier.description}
                      rating={item.serviceSupplier.rating}
                      price={item?.serviceSupplier?.price}
                      promotion={item.promotionServiceSupplier}
                      quantity={item.quantity}
                    />
                  ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 500, margin: 'auto' }}
            >
              <TextField
                disabled
                label="Tên liên hệ"
                value={userData?.account.name}
                defaultValue={''}
                fullWidth
                margin="normal"
                InputProps={{
                  style: { fontSize: 16 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon sx={{ fontSize: 24 }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: 14 },
                }}
              />
              <TextField
                disabled
                label="Số điện thoại"
                value={userData?.account.phoneNumber}
                defaultValue={''}
                margin="normal"
                fullWidth
                InputProps={{
                  style: { fontSize: 16 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalPhoneIcon sx={{ fontSize: 24 }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: 14 },
                }}
              />{' '}
              <TextField
                disabled
                label="Email"
                value={userData?.account.email}
                defaultValue={''}
                margin="normal"
                fullWidth
                InputProps={{
                  style: { fontSize: 16 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email sx={{ fontSize: 24 }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: 14 },
                }}
              />
              <TextField
                disabled
                label="Địa chỉ"
                value={userData?.account.address}
                defaultValue={''}
                fullWidth
                margin="normal"
                InputProps={{
                  style: { fontSize: 16 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <PlaceIcon sx={{ fontSize: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="h5" mt={12} textAlign={'right'}>
                Tổng giá:{' '}
                <Box
                  component="span"
                  sx={{ color: 'green', fontWeight: 'bold' }}
                >
                  {totalPrice.toLocaleString()} VND
                </Box>
              </Typography>
              <Typography variant="h5" mt={2} textAlign={'right'}>
                Cọc trước (20%):{' '}
                <Box component="span" sx={{ color: 'red', fontWeight: 'bold' }}>
                  {(totalPrice * 0.2).toLocaleString()} VND
                </Box>
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2, px: 4, py: 1, fontSize: 14, fontWeight: 600 }}
                  onClick={() => navigate(-1)}
                >
                  Trở về
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
                    '&:hover': {
                      backgroundColor: 'var(--btn-hover-color)',
                    },
                  }}
                  onClick={depositPayment}
                >
                  Thanh toán
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default BookingDetails;
