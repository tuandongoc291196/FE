import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { Container, CssBaseline, Box, Button } from "@mui/material";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./HomePage.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ServiceData } from "../../../utils/ServiceData";


const blogs = [
  {
    image: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
    title: "Blog 1",
    date: "2023-07-29",
    description:
      "Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1",
  },
  {
    image: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
    title: "Blog 2",
    date: "2023-07-28",
    description:
      "Blog description 2Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1",
  },
  {
    image: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
    title:
      "Blog 3Blog 3Blog og 3Blog 3Blog og 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3",
    date: "2023-07-29",
    description:
      "Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1Blog description 1",
  },
  {
    image: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
    title: "Blog 4",
    date: "2023-07-28",
    description: "Blog description 2",
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const services = ServiceData;

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slide]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isDown.current = true;
    if (scrollRef.current) {
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Box id="HomePage">
      <Box my={4}>
        <div className="carousel">
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
                    slide === idx ? "indicator" : "indicator indicator-inactive"
                  }
                  onClick={() => setSlide(idx)}
                ></button>
              );
            })}
          </span>
        </div>
      </Box>

      <Box my={8} mx={40}>
        <Typography
          mb={4}
          variant="h2"
          fontWeight={600}
          sx={{ textTransform: "uppercase", color: "var(--primary-color)" }}
        >
          Các dịch vụ chính
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  },
                }}
                elevation={4}
              >
                <CardMedia sx={{ height: 150 }} image={service.imageSmall} />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--primary-color)",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      navigate(service.navigate);
                    }}
                  >
                    {service.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box my={8} mx={2}>
        <Typography
          mb={2}
          variant="h2"
          fontWeight={600}
          sx={{ textTransform: "uppercase", color: "var(--primary-color)" }}
        >
          Gói Combo
        </Typography>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            gap: 2,
            cursor: "grab",
            padding: 2,
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 300,
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                },
              }}
              elevation={3}
            >
              <CardMedia sx={{ height: 200 }} image={service.imageSmall} />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}
                  onClick={() => {
                    navigate(`/services/details/sfa`);
                  }}
                >
                  {service.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box my={4}>
        <Typography
          mb={4}
          variant="h2"
          fontWeight={600}
          sx={{ textTransform: "uppercase", color: "var(--primary-color)" }}
        >
          Cẩm nang cưới
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {blogs.map((blog, index) => (
            <Card key={index} sx={{
               width: 250, m: 2 ,
               cursor: 'pointer',
               "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                },
               }} elevation={3}
               onClick={() => {
                navigate("/blogs/details/sdaf");
              }}
               >
              <CardMedia sx={{ height: 200 }} image={blog.image} />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography
                  gutterBottom
                  variant="h4"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    textOverflow: "ellipsis",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  <CalendarTodayIcon sx={{ marginRight: 1 }} /> {blog.date}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 3,
                    textOverflow: "ellipsis",
                  }}
                >
                  {blog.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Card sx={{ width: 250, m: 2,
            "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                },

           }} elevation={3}
           onClick={() => {
            navigate("/blogs");
          }}
           >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <ArrowForwardIcon
                sx={{ fontSize: 40, mb: 1, color: "var(--primary-color)" ,

                }}
              />
              <Typography variant="h4" sx={{ color: "var(--primary-color)" }}>
                Xem thêm
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
