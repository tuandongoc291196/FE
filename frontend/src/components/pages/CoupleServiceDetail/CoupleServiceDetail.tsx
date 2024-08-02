import "./CoupleServiceDetail.css";
import { useLocation, useNavigate } from "react-router";
import {
  Box,
  Grid,
  Typography,
  Button,
  Link,
  Rating,
  Paper,
  LinearProgress,
  Pagination,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagOutlined from "@mui/icons-material/Flag";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ReviewCard, ReviewCardModel } from "./ReviewCard";
import { getLabel } from "../../../utils/Utils";
import RatingPopup from "../Popup/Couple/RatingPopup";
import RequestPricePopup from "../Popup/Couple/RequestPricePopup";


const reviews: ReviewCardModel[] = [
  {
    username: "Ahri",
    rating: 5,
    date: "2023-10-19 13:13",
    content: "Dịch vụ uy tín",
    avatar: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
  },
  {
    username: "Ahri",
    rating: 5,
    date: "2023-10-19 13:13",
    content: "Dịch vụ uy tín",
    avatar: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
  },
];

const data = [
  {
    id: 1,
    src: "https://ggmeo.com/images/linh-thu-dtcl/gwen-ti-ni.jpg",
    alt: "",
  },
  {
    id: 2,
    src: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ve-binh-tinh-tu-ti-ni.jpg",
    alt: "",
  },
  {
    id: 3,
    src: "https://ggmeo.com/images/linh-thu-dtcl/kaisa-ti-ni.png",
    alt: "",
  },
  {
    id: 4,
    src: "https://ggmeo.com/images/linh-thu-dtcl/sona-ti-ni.jpg",
    alt: "",
  },
  {
    id: 5,
    src: "https://ggmeo.com/images/linh-thu-dtcl/akali-ti-ni.jpg",
    alt: "",
  },
];

const totalReviews = 369;
const recommendPercentage = 99;

const ratings = [
  { name: "Số lượng", rating: 5.0 },
  { name: "Chất lượng", rating: 5.0 },
  { name: "Đúng giờ", rating: 5.0 },
];

const CoupleServiceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const value = 4.9;

  const [openRequest, setOpenRequest] = useState(false);
  const handleOpenRequest = () => setOpenRequest(true);
  const handleCloseRequest = () => setOpenRequest(false);

  const [openReview, setOpenReview] = useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const handleSubmitReview = (ratingData: {
    quantity: number;
    quality: number;
    timeliness: number;
    description: string;
  }) => {
    console.log("Submitted Rating:", ratingData);
    // Handle the submitted rating data here
  };

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div id="CoupleServiceDetail">
      <div>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={8}>
              <div className="carousel">
                <Button
                  variant="outlined"
                  size="large"
                  className="img-view-btn"
                  onClick={() => {
                    navigate("/services/details/item/img");
                  }}
                >
                  View Photos 10
                </Button>
                <KeyboardArrowLeftIcon
                  onClick={prevSlide}
                  className="arrow arrow-left"
                />
                {data.map((item, idx) => {
                  return (
                    <img
                      src={item.src}
                      alt={item.alt}
                      key={idx}
                      className={slide === idx ? "slide" : "slide slide-hidden"}
                    />
                  );
                })}
                <KeyboardArrowRightIcon
                  sx={{ color: "red" }}
                  onClick={nextSlide}
                  className="arrow arrow-right"
                />
                <span className="indicators">
                  {data.map((_, idx) => {
                    return (
                      <button
                        key={idx}
                        className={
                          slide === idx
                            ? "indicator"
                            : "indicator indicator-inactive"
                        }
                        onClick={() => setSlide(idx)}
                      ></button>
                    );
                  })}
                </span>
              </div>

              <Box sx={{ mt: 8, textAlign: "left" }}>
                <Typography variant="h3" component="div" gutterBottom>
                  About
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <FlagOutlined sx={{ marginRight: 1, fontSize: 20 }} />
                  <Typography variant="subtitle2" fontSize={14}>
                    Đăng ngày: 2008
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: 14 }} paragraph>
                  PrimaDonna Makeover Mobile Bridal Hair & Makeup is a certified
                  beauty service, on-site beauty service located in San
                  Francisco, California & Boise, ID. The owner, Yolanda, and her
                  team strive to deliver the best service possible to their
                  clients, which is why their clients keep coming back to them
                  again and again. Now offering Boise, ID wedding flower
                  packages. PrimaDonna Makeover Mobile Bridal Hair & Makeup is a
                  certified beauty service, on-site beauty service located in
                  San Francisco, California & Boise, ID. The owner, Yolanda, and
                  her team strive to deliver the best service possible to their
                  clients, which is why their clients keep coming back to them
                  again and again. Now offering Boise, ID wedding flower
                  packages. PrimaDonna Makeover Mobile Bridal Hair & Makeup is a
                  certified beauty service, on-site beauty service located in
                  San Francisco, California & Boise, ID. The owner, Yolanda, and
                  her team strive to deliver the best service possible to their
                  clients, which is why their clients keep coming back to them
                  again and again. Now offering Boise, ID wedding flower
                  packages. PrimaDonna Makeover Mobile Bridal Hair & Makeup is a
                  certified beauty service, on-site beauty service located in
                  San Francisco, California & Boise, ID. The owner, Yolanda, and
                  her team strive to deliver the best service possible to their
                  clients, which is why their clients keep coming back to them
                  again and again. Now offering Boise, ID wedding flower
                  packages. PrimaDonna Makeover Mobile Bridal Hair & Makeup is a
                  certified beauty service, on-site beauty service located in
                  San Francisco, California & Boise, ID. The owner, Yolanda, and
                  her team strive to deliver the best service possible to their
                  clients, which is why their clients keep coming back to them
                  again and again. Now offering Boise, ID wedding flower
                  packages. PrimaDonna Makeover Mobile Bridal Hair & Makeup is a
                  certified beauty service, on-site beauty service located in
                  San Francisco, California & Boise, ID. The owner, Yolanda, and
                  her team strive to deliver the best service possible to their
                  clients, which is why their clients keep coming back to them
                  again and again. Now offering Boise, ID wedding flower
                  packages.
                </Typography>
              </Box>

              <Box mt={4} mb={4}>
                <Typography variant="h4" gutterBottom align="left">
                  Đánh giá Sound Originals Photo & Video
                </Typography>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={5} sx={{ textAlign: "left" }}>
                    <Box>
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ fontSize: 20, fontWeight: 600 }}
                        >
                          4.8
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ fontSize: 16, ml: 1 }}
                        >
                          {getLabel(4.8)}
                        </Typography>
                      </Box>
                      <Rating
                        name="rating-service-feedback"
                        value={value}
                        readOnly
                        precision={0.1}
                        size="large"
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 14, lineHeight: 2 }}
                      >
                        {totalReviews} đánh giá
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        backgroundColor: "var(--primary-color)",
                        "&:hover": {
                          backgroundColor: "var(--btn-hover-color)",
                        },
                      }}
                      style={{
                        marginTop: "10px",
                        width: "300px",
                        padding: "10px 20px",
                      }}
                      onClick={handleOpenReview}
                    >
                      Viết đánh giá
                    </Button>
                    <RatingPopup
                      open={openReview}
                      onClose={handleCloseReview}
                      serviceName="Service Name"
                      onSubmit={handleSubmitReview}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      {ratings.map((item, index) => (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mt={2}
                          width={400}
                        >
                          <Typography fontSize={16}>{item.name}</Typography>
                          <Box display="flex" alignItems="center">
                            <LinearProgress
                              variant="determinate"
                              value={(item.rating / 5) * 100}
                              style={{
                                width: "200px",
                                height: "10px",
                                marginRight: "10px",
                                borderRadius: "5px",
                              }}
                              sx={{
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: "var(--primary-color)",
                                },
                              }}
                            />
                            <Typography fontSize={16}>
                              {item.rating.toFixed(1)}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
                <Box display="flex" justifyContent="center" my={4}>
                  <Pagination count={10} variant="outlined" />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                component={Paper}
                elevation={3}
                sx={{
                  textAlign: "left",
                  position: "fixed",
                  p: 2,
                  width: "550px",
                  top: "130px",
                  right: "20px",
                }}
              >
                <Typography variant="h3" fontWeight={600}>
                  PrimaDonna Makeover
                </Typography>
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="rating-service"
                    value={value}
                    readOnly
                    precision={0.1}
                    size="large"
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Typography variant="h5" sx={{ ml: 1 }}>
                    {value}
                  </Typography>
                  <Typography variant="h5" sx={{ ml: 1 }}>
                    {getLabel(value)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 16,
                    marginTop: 2,
                  }}
                >
                  <LocationOnIcon />
                  <Link
                    href="#"
                    sx={{
                      color: "black",
                      textDecoration: "underline",
                      textDecorationColor: "black",
                      ml: 1,
                    }}
                  >
                    San Francisco, CA
                  </Link>
                </Box>

                <Button
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  sx={{
                    marginTop: 4,
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--btn-hover-color)",
                    },
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                  onClick={handleOpenRequest}
                >
                  Giá liên hệ
                </Button>
                <RequestPricePopup
                  open={openRequest}
                  handleClose={handleCloseRequest}
                  serviceId=""
                  serviceName=""
                  suplierID=""
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default CoupleServiceDetail;
