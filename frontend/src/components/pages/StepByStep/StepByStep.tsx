import React, { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import ItemServiceViewCard from './ItemServiceViewCard';
import { ServiceData } from '../../../utils/ServiceData';
import { getServiceByCategory } from '../../../api/CoupleAPI';

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
              fontSize: '1.2rem',
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
            supplierID={service.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StepByStep;
