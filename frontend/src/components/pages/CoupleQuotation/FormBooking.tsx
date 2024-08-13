import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
} from '@mui/material';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { createBooking } from '../../../redux/apiRequest';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearCart } from '../../../utils/CartStorage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  promotion: number;
  quantity: number;
}
interface BookingItem {
  serviceSupplierId: string;
  dateCompleted: string;
  note: string;
  quantity: number;
}
interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  services: CartItem[];
  totalPrice: number;
  totalPromotionPrice: number;
}

const FormBooking: React.FC<ServiceModalProps> = ({
  open,
  onClose,
  services,
  totalPrice,
  totalPromotionPrice,
}) => {
  const [serviceData, setServiceData] = useState<BookingItem[]>([]);
  useEffect(() => {
    setServiceData(
      services.map((service) => ({
        serviceSupplierId: service.id.toString(),
        dateCompleted: '',
        note: '',
        quantity: service.quantity,
      }))
    );
  }, [services]);

  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const handleDateChange = (index: number, date: string) => {
    const newServiceData = [...serviceData];
    newServiceData[index].dateCompleted = date;
    setServiceData(newServiceData);
  };

  const handleNoteChange = (index: number, note: string) => {
    const newServiceData = [...serviceData];
    newServiceData[index].note = note;
    setServiceData(newServiceData);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createBooking(
        {
          coupleId: user.userId,
          listServiceSupplier: serviceData,
        },
        user?.token
      );
      if (res) {
        clearCart();
        setLoading(false);
        onClose();
        window.location.href = `/booking-details/${res.id}`;
      }
    } catch (error) {
      console.error('Failed to submit booking:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 1000,
          maxHeight: '900px',
          borderRadius: '15px',
          padding: '5% 5%',
          bgcolor: 'var(--white-color)',
        }}
      >
        <Typography id="modal-modal-description">
          <div className="create-container">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>
                      Tên sản phẩm
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '14px',
                        textAlign: 'center',
                        fontWeight: 600,
                      }}
                    >
                      Giá bán
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '14px',
                        textAlign: 'center',
                        fontWeight: 600,
                      }}
                    >
                      Số lượng
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '14px',
                        textAlign: 'center',
                        fontWeight: 600,
                      }}
                    >
                      %KM
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>
                      Ngày hoàn thành
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>
                      Ghi chú
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceData.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: '12px' }}>
                        {services[index]?.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', textAlign: 'center' }}>
                        {services[index]?.price.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', textAlign: 'center' }}>
                        {services[index]?.quantity}
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', textAlign: 'center' }}>
                        {services[index]?.promotion}%
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker
                              onChange={(value: Dayjs | null) => {
                                if (value) {
                                  handleDateChange(
                                    index,
                                    value.format('YYYY-MM-DD')
                                  );
                                }
                              }}
                              disablePast
                              label="Ngày hoàn thành"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', width: '30%' }}>
                        <TextField
                          value={service.note}
                          onChange={(e) =>
                            handleNoteChange(index, e.target.value)
                          }
                          fullWidth
                          multiline
                          rows={3}
                          placeholder="Nhập ghi chú"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
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
                onClick={onClose}
                sx={{ mr: 2, px: 4, py: 1, fontSize: 14, fontWeight: 600 }}
              >
                Huỷ
              </Button>
              <Button
                variant="contained"
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1,
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                }}
                onClick={handleSubmit}
              >
                Đặt đơn
              </Button>
            </Box>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

export default FormBooking;
