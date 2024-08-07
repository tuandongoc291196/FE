import React from 'react'
import { useParams } from 'react-router';
import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { Container } from '@mui/material';
import "./ServiceDetail.css";
import "../../../constants/styles/TableService.css";
import { ServiceEntity } from '../../../types/entity/Entity';
// import { getServicesById } from '../../../redux/apiRequest';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

interface Props {
  setMessageStatus: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

const storage = getStorage();

const ServiceDetail: FC<Props> = (props) => {
  const { id } = useParams();
  const [service, setService] = useState<ServiceEntity>();
  useEffect(() => {
    // fetchData();
  }, [])

  // async function fetchData() {
  //   const response =
  //    await getServicesById(id);
  //   setService(response);
  //   console.log();

  // }

  const ImageSlider: React.FC = () => {
    return (
      <Carousel autoPlay indicators>
        {service?.listImages?.map((item, i) =>
          <Paper>
            <img src={`${item}`} alt={`${item}`} style={{ width: '458px', height: '600px' }} key={i} />
            {
              (service.promotionService) ?
                (
                  <h2 className="promotion">Giảm giá {service.promotionService.value + "%"}</h2>
                ) : null
            }
          </Paper>
        )}
      </Carousel>
    );
  }

  return (
    <div id="ServiceDetail">
      <div className="container">
        <Container className='images-container'>
          <ImageSlider />
        </Container>
        <div className="service-information">
          <div className="information-container">
            <h1 className="header">{service?.name}</h1>
            <span className="service-price">{`${service?.price}`} VNĐ</span>
            <div className="underline"></div>
            <div className="description">
              <p className="description-header">Chi tiết</p>
              <div className="description-text">{service?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail