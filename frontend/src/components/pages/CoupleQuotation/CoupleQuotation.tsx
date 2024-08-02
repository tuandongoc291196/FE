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
  const [cart, setCart] = React.useState<Product[]>(products);
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const [servicesPrice, setServicePrice] = useState(getCart());
  const [servicesQuotation, setServiceQuotation] = useState<any[]>([]);

  const getListQuotationf = async () => {
    const response = await getListQuotation("COUPLE-1",user.token);
    const updatedData = await Promise.all(response.map(async (item) => {
      const serviceData = await getServiceById(item.serviceId);
      return {
        ...item,
        serviceData
      };
    }));
    console.log(updatedData)
    setServiceQuotation(updatedData);
  }

  useEffect( () => { 
    const handleStorageChange = () => {
      setServicePrice(getCart());
    };

    getListQuotationf()

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    setServicePrice(getCart());
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleDelete = (id: string) => {
    setCart(servicesQuotation.filter((product) => product.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
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
          Dịch vụ có giá
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
              {/* <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Số lượng
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 16,
                  color: "var(--primary-color)",
                  fontWeight: 600,
                }}
              >
                Thành tiền
              </TableCell> */}
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
                {/* <TableCell>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          Math.max(product.quantity - 1, 1)
                        )
                      }
                    >
                      <RemoveIcon sx={{ color: "red", fontSize: 20 }} />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2, fontSize: 14 }}>
                      {product.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity + 1)
                      }
                    >
                      <AddIcon sx={{ color: "green", fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>
                  {(product.price * product.quantity).toLocaleString()} VND
                </TableCell> */}
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

      <Typography
        variant="h4"
        my={4}
        fontWeight={600}
        sx={{ textTransform: "uppercase", color:"var(--primary-color)" }}
      >
        <Divider
          sx={{
            mx: "auto",
            width: 700,
            "&::before, &::after": {
              borderColor: "var(--primary-color)",
              borderWidth: "1px",
            },
          }}
        >
          Dịch vụ yêu cầu giá
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
            {servicesQuotation.map((product, index) => (
              <TableRow key={product.serviceData.id}>
                <TableCell sx={{ fontSize: 14 }}>{index + 1}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={product.serviceData.listImages[0]}
                    alt={product.serviceData.name}
                    width={50}
                    height={50}
                    sx={{ borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 550 }}>
                  {product.serviceData.name}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>{product.price === 0 ? "Đợi báo giá" : `${product.price.toLocaleString('vi-VN')}`}</TableCell>
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
