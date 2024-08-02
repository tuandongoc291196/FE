import React, { useEffect, useState } from "react";
import "./CoupleService.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Pagination,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ServiceItemViewCard from "./ServiceItemViewCard";
import { ServiceData } from "../../../utils/ServiceData";

const CoupleService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const coupleServiceData = ServiceData.find((e) => e.name === path);
  
  const [selectedService, setSelectedService] = useState(coupleServiceData?.items[0]?.name || "");

  useEffect(() => {
    setSelectedService(coupleServiceData?.items[0]?.name || "");
  }, [coupleServiceData]);

  return (
    <div id="CoupleService">
      <div className="image-service">
        <img src={coupleServiceData?.imageBig} alt={coupleServiceData?.alt} />
      </div>

      <div className="content">
        <aside className="aside-bar">
          <div className="filter-component">
            <legend className="filter-name">Phân cấp</legend>
            <ul className="filter-list">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="ECONOMY"
                name="radio-buttons-group"
              >
                <li className="filter-item">
                  <Radio
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                    value="ECONOMY"
                  />{" "}
                  Phổ thông
                </li>
                <li className="filter-item">
                  <Radio
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                    value="LUXURY "
                  />{" "}
                  Cao cấp
                </li>
              </RadioGroup>
            </ul>
          </div>
          {coupleServiceData?.items.length !== 0 && (
            <div className="filter-component">
              <legend className="filter-name">Dịch vụ</legend>
              <ul className="filter-list">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  name="radio-buttons-group"
                >
                  {coupleServiceData?.items.map((item, index) => {
                    return (
                      <li className="filter-item">
                        <Radio
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                          value={item.name}
                        />
                        {item.name}
                      </li>
                    );
                  })}
                </RadioGroup>
              </ul>
            </div>
          )}
          {coupleServiceData?.isPrice && (
            <div className="filter-component">
              <legend className="filter-name">Chi phí</legend>
              <ul className="filter-list">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
                >
                  <li className="filter-item">
                    <Radio
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      value="1"
                    />{" "}
                    Dưới 5.000.000 VNĐ
                  </li>
                  <li className="filter-item">
                    <Radio
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      value="2"
                    />{" "}
                    5.000.000 - 10.000.000 VNĐ
                  </li>
                  <li className="filter-item">
                    <Radio
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      value="3"
                    />{" "}
                    10.000.000 - 15.000.000 VNĐ
                  </li>
                  <li className="filter-item">
                    <Radio
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      value="4"
                    />{" "}
                    15.000.000 - 20.000.000 VNĐ
                  </li>
                  <li className="filter-item">
                    <Radio
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      value="5"
                    />{" "}
                    Trên 20.000.000 VNĐ
                  </li>
                </RadioGroup>
              </ul>
            </div>
          )}
        </aside>
        <div className="filter-content">
          <div className="content-header">
            <strong>80</strong> kết quả
          </div>
          <ul className="content-list">
            <ServiceItemViewCard
              id = "service1"
              imageUrl="https://cdn0.weddingwire.com/vendor/262779/3_2/640/png/ww-storefront_51_977262-167476398667285.webp"
              location="San Francisco, CA"
              title="Sound Originals Photo & Video"
              ratingValue={3}
              description="Sound Originals Photo & Video is a 5-star photography and videography team. Couples love Sound Originals! Storytelling Lasts Forever. Y dedicated to excellent quality. Artistic portraits.Y dedicated to excellent quality. ArtiY dedicated to excellent quality. ArtiY dedicated to excell"
              priceText={
                coupleServiceData?.isPrice ? `${(20000000).toLocaleString('vi-VN')} VND` : ""
              }
            />
          </ul>
          <Box display="flex" justifyContent="center">
            <Pagination
              count={10}
              variant="outlined"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CoupleService;
