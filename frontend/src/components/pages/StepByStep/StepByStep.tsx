import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import WeddingIcon from '@mui/icons-material/Favorite';
import VendorManagerIcon from '@mui/icons-material/AccountBox';
import SeatingChartIcon from '@mui/icons-material/EventSeat';
import RegistryIcon from '@mui/icons-material/CardGiftcard';
import ItemServiceViewCard from './ItemServiceViewCard';
import DiamondIcon from '@mui/icons-material/Diamond';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { ServiceData } from '../../../utils/ServiceData';
// const services = [
//   { icon: <WeddingIcon sx={{ fontSize: 40 }}/>, label: 'Thiệp cưới' , name: "invitations", isPrice: true},
//   { icon: <DiamondIcon sx={{ fontSize: 40 }}/>, label: 'Nhẫn cưới' , name: "jewelry", isPrice: true},
//   { icon: <VendorManagerIcon sx={{ fontSize: 40 }}/>, label: 'Ảnh cưới', name: "photography", isPrice: false },
//   { icon: <CheckroomIcon sx={{ fontSize: 40 }}/>, label: 'Trang phục', name: "outfit", isPrice: true },
//   { icon: <AutoFixHighIcon sx={{ fontSize: 40 }}/>, label: 'Makeup', name: "makeup", isPrice: true },
//   { icon: <DirectionsCarIcon sx={{ fontSize: 40 }}/>, label: 'Xe hoa' , name: "wedding-car", isPrice: false},
//   { icon: <RegistryIcon sx={{ fontSize: 40 }}/>, label: 'Địa điểm', name: "venues" , isPrice: false},
//   { icon: <SeatingChartIcon sx={{ fontSize: 40 }}/>, label: 'Trang trí', name: "decoration" , isPrice: false},
//   { icon: <RegistryIcon sx={{ fontSize: 40 }}/>, label: 'Lễ vật', name: "wedding-gifts", isPrice: true },

// ];

const serviceDetails = [
  { title: 'Service 1', description: 'Details about service 1' },
  { title: 'Service 2', description: 'Details about service 2' },
  { title: 'Service 3', description: 'Details about service 3' },
  // Add more services as needed
];

const StepByStep = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const services = ServiceData

  return (
    <Box sx={{marginX: 20}}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {services.map((service, index) => (
          <Tab
            key={index}
            icon={service.icon}
            label={service.label}
            sx={{
              fontSize: '1.2rem',
              // color: selectedTab === index ? "var(--primary-color)" : 'inherit',
              color: selectedTab === index ? "var(--primary-color)" : 'black'
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ padding: 2 }}>
        
          {serviceDetails.map((service, index) => (
           
              <ItemServiceViewCard
        imageUrl="https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
        title="The Bridges Golf Club"
        location="San Ramon, CA"
        rating={4.8}
        description="The Bridges Golf Club is an elegant and sophisticated wedding venue located in San Ramon, California. Overlooking the beautiful rolling hills and valley of San Ramon, this Mediterranean-style structure features spectacular and dramatic views of the setting sun over the East Bay Hills, a welcoming..."
        price= {services[selectedTab]?.isPrice ? `${(20000000).toLocaleString('vi-VN')} VND` : ""}
      />
           
          ))}
      </Box>
    </Box>
  );
};

export default StepByStep;
