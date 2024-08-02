import React from 'react';
import { Box, Button, Card, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import DeleteIcon from "@mui/icons-material/Delete";

interface Booking {
  id: number;
  date: string;
  service: string;
  status: string;
  price: number;
  amount: number;
}

const bookings: Booking[] = [
  { id: 1, date: '2024-07-01', service: 'Hotel Room', status: 'Pending', price: 1500000, amount: 1 },
  { id: 2, date: '2024-06-25', service: 'Flight Ticket', status: 'Confirmed', price: 5000000, amount: 1 },
];

const BookingHistory: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log("Back")
  };

  const handlePayment = () => {
    console.log("Payment")
  };

  const handleDelete = (id: number) => {
    // setCart(cart.filter((product) => product.id !== id));
  };

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        my={4}
        fontWeight={600}
        sx={{ textTransform: "uppercase" , color: "var(--primary-color)"}}
      >
        <Divider
          sx={{
            mx: "auto",
            width: 700,
            "&::before, &::after": {
              borderColor: "var(--primary-color)",
              borderWidth: "2px",
            },
          }}
        >
          Đơn hàng
        </Divider>
      </Typography>
      <TableContainer elevation={4} sx={{ mt: 4 }} component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Dịch vụ
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Giá bán
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Hủy
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell sx={{ fontSize: 14 }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: 14,fontWeight: 550 }}>
                  {product.service}
                </TableCell>
                <TableCell sx={{ fontSize: 14,  }}>
                  {product.status}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>{product.price} VND</TableCell>
                
                <TableCell>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <DeleteIcon sx={{ fontSize: 30, color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={2} display="flex" flexDirection="column" alignItems="flex-end">
        <Typography my={1} variant="h5">
          Tổng cộng:{" "}
          <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
            {(2000000000).toLocaleString()} VND
          </Box>
        </Typography>
        <Typography my={1} variant="h5">
          Đã cọc:{" "}
          <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
            {(2000000000).toLocaleString()} VND
          </Box>
        </Typography>
        <Typography my={1} variant="h5">
          Còn lại:{" "}
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            {(2000000000).toLocaleString()} VND
          </Box>
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2, px: 4, py: 1, fontSize: 14, fontWeight: 600 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trở về
          </Button>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              px: 4,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
            onClick={() => {
              navigate("/booking-details");
            }}
          >
            Tất toán
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingHistory;
