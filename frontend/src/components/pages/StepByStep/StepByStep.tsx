import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import WeddingIcon from "@mui/icons-material/Favorite";
import VendorManagerIcon from "@mui/icons-material/AccountBox";
import SeatingChartIcon from "@mui/icons-material/EventSeat";
import RegistryIcon from "@mui/icons-material/CardGiftcard";
import ItemServiceViewCard from "./ItemServiceViewCard";
import DiamondIcon from "@mui/icons-material/Diamond";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { ServiceData } from "../../../utils/ServiceData";
import { getServiceByCategory } from "../../../api/CoupleAPI";

const serviceDetails = [
  { title: "Service 1", description: "Details about service 1" },
  { title: "Service 2", description: "Details about service 2" },
  { title: "Service 3", description: "Details about service 3" },
  // Add more services as needed
];

const StepByStep = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [serviceData, setServiceData] = React.useState<any[]>([]);
  const services = ServiceData;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getData = async () => {
    const response = await getServiceByCategory(services[selectedTab].id);
    setServiceData(response);
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  return (
    <Box sx={{ marginX: 20 }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        {services.map((service, index) => (
          <Tab
            key={index}
            icon={service.icon}
            label={service.label}
            sx={{
              fontSize: "1.2rem",
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {serviceData.map((service, index) => (
          <ItemServiceViewCard
            id={service.id}
            imageUrl={service?.listImages[0]}
            title={service.name}
            location="Tp. Hồ Chí Minh"
            rating={4.5}
            description={service.description}
            price={service.price}
            supplierID={service.serviceSupplierResponse.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StepByStep;
