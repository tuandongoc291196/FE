import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ItemCardView from "./ItemCardView";
import { useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";

interface OrderFormProps {
  // Props có thể nhận thêm từ bên ngoài nếu cần
}

const BookingDetails: React.FC<OrderFormProps> = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "BO", // Giá trị mặc định
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý khi submit form, ví dụ: gửi dữ liệu lên server
    console.log(formData);
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

  return (
    <Box sx={{ mt: 5, marginX: 10 }}>
      <Typography
        variant="h2"
        sx={{
          textTransform: "uppercase",
          color: "var(--primary-color)",
          fontWeight: 600,
        }}
      >
        <Divider
          sx={{
            mx: "auto",
            width: 1000,
            "&::before, &::after": {
              borderColor: "var(--primary-color)",
              borderWidth: "1px",
            },
          }}
        >
          Hoàn tất đơn hàng
        </Divider>
      </Typography>
      <Grid container mt={4} spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" mb={2}>
            Danh sách dịch vụ
          </Typography>
          <Box
            ref={servicesRef}
            sx={{
              height: "70vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
              cursor: "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <ItemCardView
              imageUrl="https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
              title="The Bridges Golf Club"
              location="San Ramon, CA"
              rating={4.8}
              reviews={101}
              description="The Bridges Golf Club is an elegant and sophisticated wedding venue located in San Ramon, California. Overlooking the beautiful rolling hills and valley of San Ramon, this Mediterranean-style structure features spectacular and dramatic views of the setting sun over the East Bay Hills, a welcoming..."
              features={[
                "Ceremony/Reception",
                "Outdoor",
                "Indoor",
                "Clean Up",
                "Event Planner",
              ]}
              capacity={300}
            />
            <ItemCardView
              imageUrl="https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
              title="The Bridges Golf Club"
              location="San Ramon, CA"
              rating={4.8}
              reviews={101}
              description="The Bridges Golf Club is an elegant and sophisticated wedding venue located in San Ramon, California. Overlooking the beautiful rolling hills and valley of San Ramon, this Mediterranean-style structure features spectacular and dramatic views of the setting sun over the East Bay Hills, a welcoming..."
              features={[
                "Ceremony/Reception",
                "Outdoor",
                "Indoor",
                "Clean Up",
                "Event Planner",
              ]}
              capacity={300}
            />
            <ItemCardView
              imageUrl="https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
              title="The Bridges Golf Club"
              location="San Ramon, CA"
              rating={4.8}
              reviews={101}
              description="The Bridges Golf Club is an elegant and sophisticated wedding venue located in San Ramon, California. Overlooking the beautiful rolling hills and valley of San Ramon, this Mediterranean-style structure features spectacular and dramatic views of the setting sun over the East Bay Hills, a welcoming..."
              features={[
                "Ceremony/Reception",
                "Outdoor",
                "Indoor",
                "Clean Up",
                "Event Planner",
              ]}
              capacity={300}
            />
            <ItemCardView
              imageUrl="https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
              title="The Bridges Golf Club"
              location="San Ramon, CA"
              rating={4.8}
              reviews={101}
              description="The Bridges Golf Club is an elegant and sophisticated wedding venue located in San Ramon, California. Overlooking the beautiful rolling hills and valley of San Ramon, this Mediterranean-style structure features spectacular and dramatic views of the setting sun over the East Bay Hills, a welcoming..."
              features={[
                "Ceremony/Reception",
                "Outdoor",
                "Indoor",
                "Clean Up",
                "Event Planner",
              ]}
              capacity={300}
            />
            <ItemCardView
              imageUrl="https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
              title="The Bridges Golf Club"
              location="San Ramon, CA"
              rating={4.8}
              reviews={101}
              description="The Bridges Golf Club is an elegant and sophisticated wedding venue located in San Ramon, California. Overlooking the beautiful rolling hills and valley of San Ramon, this Mediterranean-style structure features spectacular and dramatic views of the setting sun over the East Bay Hills, a welcoming..."
              features={[
                "Ceremony/Reception",
                "Outdoor",
                "Indoor",
                "Clean Up",
                "Event Planner",
              ]}
              capacity={300}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            Thông tin liên hệ
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 500, margin: "auto" }}
          >
            <TextField
              label="Tên liên hệ"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              label="Số điện thoại"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
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
            />
            <TextField
              label="Địa chỉ"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
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
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
            <TextField
              label="Ghi chú"
              variant="outlined"
              name="note"
              value={formData.note}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontSize: 16 },
              }}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
            <Typography variant="h5" mt={2} textAlign={"right"}>
              Tổng giá:{" "}
              <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
                {(12000000).toLocaleString()} VND
              </Box>
            </Typography>
            <Typography variant="h5" mt={2} textAlign={"right"}>
              Cọc trước (20%):{" "}
              <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
                {(5000000).toLocaleString()} VND
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
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "var(--btn-hover-color)",
                  },
                }}
                onClick={() => {
                  navigate("/booking-history");
                }}
              >
                Thanh toán
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingDetails;
