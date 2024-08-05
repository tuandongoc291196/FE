import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";
import Divider from "@mui/material/Divider";
import { getCart, removeFromCart } from "../../../utils/CartStorage";
import { getListQuotation, getServiceById } from "../../../api/CoupleAPI";
import { useSelector } from "react-redux";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    image: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
    name: "Lễ Vật Đạm Ngõ : Mẫu 01 A",
    price: 1200000,
    quantity: 1,
  },
  {
    id: 2,
    image: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
    name: "Lễ Vật Đạm Ngõ : Mẫu 01 A",
    price: 1200000,
    quantity: 1,
  },
];


const CoupleQuotation: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const [servicesPrice, setServicePrice] = useState(getCart());


  useEffect( () => { 
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


  const totalPrice = servicesPrice.reduce(
    (total, product) => total + product.price,
    0
  );


  return (
    <Box p={3}>
      <Typography
        variant="h4"
        my={2}
        fontWeight={600}
        sx={{ textTransform: "uppercase", color:"var(--primary-color)"  }}
      >
        <Divider
          sx={{
            mx: "auto",
            width: 500,
            "&::before, &::after": {
              borderColor: "var(--primary-color)",
              borderWidth: "1px",
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
                Hình ảnh
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Tên sản phẩm
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
                    sx={{ borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 550 }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>
                  {product.price.toLocaleString()} VND
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveFromCart(product.id)}>
                    <DeleteIcon sx={{ fontSize: 30, color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" flexDirection="column" alignItems="flex-end">
        <Typography my={2} variant="h4">
          Tổng cộng:{" "}
          <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
            {totalPrice.toLocaleString('vi-VN')} VND
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
            Hoàn tất đơn hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CoupleQuotation;
