import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import {
  cancelBooking,
  getBookingById,
  getBookingHistoryByCoupleId,
  ratingBooking,
  requestPayment,
} from '../../../redux/apiRequest';
import { BOOKING_STATUS } from '../../../constants/consts';
import { KeyboardBackspace, Visibility } from '@mui/icons-material';
import StatusChip from './StatusChip';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const BookingHistoryDetail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const [rating, setRating] = useState<number | null>(0);
  const [description, setDescription] = useState('');

  const { id } = useParams();
  const getBookingDetails = async (bookingId: string) => {
    setLoading(true);
    const res = await getBookingById(bookingId, user.token);
    if (res) setData(res);
    setLoading(false);
  };
  useEffect(() => {
    if (id) getBookingDetails(id);
  }, []);
  const hasApprovedItem = data?.listBookingDetail?.some(
    (item: any) => item.status === BOOKING_STATUS.approved
  );
  const remainingPayment = async () => {
    const listBookingIds: string[] = [];
    data.listBookingDetail.map((item: any) => {
      if (item.status === BOOKING_STATUS.done) listBookingIds.push(item.id);
    });
    const args = { deposit: false, listBookingDetailId: listBookingIds };
    const res = await requestPayment(args, user.token);
    if (res) {
      window.location.href = res;
    }
  };

  const handleDelete = async (detailId: string) => {
    setLoading(true);
    const res = await cancelBooking(detailId, reason, user.token);
    if (res) {
      if (id) getBookingDetails(id);
      setOpen(false);
      setReason('');
      setLoading(false);
    }
  };
  const handleRating = async (detailId: string) => {
    setLoading(true);
    const res = await ratingBooking(
      detailId,
      rating,
      user.userId,
      description,
      user.token
    );
    if (res) {
      if (id) getBookingDetails(id);
      setOpenRating(false);
      setDescription('');
      setRating(0);
      setLoading(false);
    }
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Combine time and date
    return `${formattedDate}`;
  };
  console.log(data);
  return (
    <Box p={3}>
      <Button
        variant="contained"
        className="text-start flex text-lg items-center gap-2 font-bold cursor-pointer "
        onClick={() => navigate('/booking-history')}
      >
        <div>
          <KeyboardBackspace sx={{ width: 20, height: 20 }} />
        </div>
        <div>Trở về</div>
      </Button>
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
          Chi tiết đơn hàng
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
                    Mã đơn
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
                    Đơn giá
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      textAlign: 'center',
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
                    Giảm giá
                  </TableCell>{' '}
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                    }}
                  >
                    Tổng giá
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Ngày hoàn thành
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  {data?.status === BOOKING_STATUS.processing ||
                    (data?.status === BOOKING_STATUS.completed && (
                      <TableCell
                        sx={{
                          fontSize: 16,
                          color: 'var(--primary-color)',
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                      >
                        Hành động
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.listBookingDetail.map((detail: any) => (
                    <TableRow key={detail.id}>
                      <TableCell sx={{ fontSize: 14 }}>{detail?.id}</TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {detail.serviceSupplier.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {detail.price.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, textAlign: 'center' }}>
                        {detail.quantity}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 14, fontWeight: 550, color: 'green' }}
                      >
                        {detail.promotionServiceSupplier ? (
                          detail.promotionServiceSupplier?.type === 'MONEY' ? (
                            <span>
                              -{' '}
                              {detail.promotionServiceSupplier?.value.toLocaleString()}{' '}
                              VNĐ{' '}
                            </span>
                          ) : (
                            <span>
                              - {detail.promotionServiceSupplier?.value} %{' '}
                            </span>
                          )
                        ) : (
                          <>-</>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {detail.promotionServiceSupplier ? (
                          detail.promotionServiceSupplier?.type === 'MONEY' ? (
                            <>
                              {(
                                (detail.price -
                                  detail.promotionServiceSupplier?.value) *
                                detail.quantity
                              ).toLocaleString()}
                            </>
                          ) : (
                            <>
                              {(
                                (detail.price -
                                  (detail.price *
                                    (detail.promotionServiceSupplier?.value ??
                                      0)) /
                                    100) *
                                detail.quantity
                              ).toLocaleString()}{' '}
                            </>
                          )
                        ) : (
                          <>
                            {(detail.price * detail.quantity).toLocaleString()}
                          </>
                        )}{' '}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, textAlign: 'center' }}>
                        {formatDate(detail.completedDate)}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, textAlign: 'center' }}>
                        <StatusChip status={detail.status} />
                      </TableCell>
                      {data?.status === BOOKING_STATUS.processing && (
                        <>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <IconButton onClick={() => setOpen(true)}>
                              <DeleteIcon
                                sx={{
                                  fontSize: 20,
                                  color: 'red',
                                }}
                              />
                            </IconButton>
                          </TableCell>
                          <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography fontWeight={500} fontSize={16} mb={2}>
                                Điền lý do hủy
                              </Typography>
                              <TextField
                                type="text"
                                fullWidth
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                label={'Lý do'}
                              />
                              <Box sx={{ textAlign: 'end', mt: 2 }}>
                                <Button
                                  sx={{
                                    px: 2,
                                    py: 0.5,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                  }}
                                  variant="contained"
                                  onClick={() => handleDelete(detail.id)}
                                  disabled={reason === ''}
                                >
                                  Xác nhận
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </>
                      )}
                      {data?.status === BOOKING_STATUS.completed && (
                        <>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Box>
                              <Button
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  fontSize: 10,
                                  fontWeight: 600,
                                }}
                                disabled={detail.serviceSupplier.rating !== 0}
                                onClick={() => setOpenRating(true)}
                              >
                                {detail.serviceSupplier.rating !== 0
                                  ? 'Đã đánh giá'
                                  : 'Đánh giá'}
                              </Button>
                            </Box>
                          </TableCell>
                          <Modal
                            open={openRating}
                            onClose={() => setOpenRating(true)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography fontWeight={500} fontSize={16} mb={2}>
                                Đánh giá
                              </Typography>
                              <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                  setRating(newValue);
                                }}
                                size="large"
                              />
                              <TextField
                                type="text"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label={'Mô tả đánh giá'}
                                multiline
                                rows={3}
                              />
                              <Box sx={{ textAlign: 'end', mt: 2 }}>
                                <Button
                                  onClick={() => handleRating(detail.id)}
                                  sx={{
                                    px: 2,
                                    py: 0.5,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                  }}
                                  variant="contained"
                                  disabled={rating === 0}
                                >
                                  Xác nhận
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </>
                      )}
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
            {hasApprovedItem && (
              <>
                <Typography my={1} variant="h5">
                  Tổng cộng:{' '}
                  <Box
                    component="span"
                    sx={{ color: 'green', fontWeight: 'bold' }}
                  >
                    {data?.totalPrice?.toLocaleString()} VND
                  </Box>
                </Typography>
                <Box mt={2}>
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
                    onClick={() => navigate(`/booking-details/${id}`)}
                  >
                    Đặt cọc
                  </Button>
                </Box>
              </>
            )}
            {data?.status === BOOKING_STATUS.done && (
              <>
                <Typography my={1} variant="h5">
                  Tổng cộng:{' '}
                  <Box
                    component="span"
                    sx={{ color: 'green', fontWeight: 'bold' }}
                  >
                    {data?.totalPrice?.toLocaleString()} VND
                  </Box>
                </Typography>
                <Typography my={1} variant="h5">
                  Tiền đã cọc (20%):{' '}
                  <Box
                    component="span"
                    sx={{ color: 'blue', fontWeight: 'bold' }}
                  >
                    {(data?.totalPrice * 0.2)?.toLocaleString()} VND
                  </Box>
                </Typography>
                <Typography my={1} variant="h5">
                  Còn lại:{' '}
                  <Box
                    component="span"
                    sx={{ color: 'red', fontWeight: 'bold' }}
                  >
                    {(
                      data?.totalPrice -
                      data?.totalPrice * 0.2
                    )?.toLocaleString()}{' '}
                    VND
                  </Box>
                </Typography>
                <Box mt={2}>
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
                    onClick={remainingPayment}
                  >
                    Tất toán
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BookingHistoryDetail;
