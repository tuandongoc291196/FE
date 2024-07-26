import React from 'react'
import { useParams } from 'react-router';
import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { Container } from '@mui/material';
import "../ServiceSupplier/ServiceDetail.css";
import "../../../constants/styles/TableService.css";

interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

interface ItemProps {
    item: {
        name: string;
        description: string;
        image: string;
    };
}

const items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        image: "https://cdn0.weddingwire.com/cat/10058609--mfvo10058609.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        image: "https://cdn0.weddingwire.com/cat/10058611--mfvg10058611.jpg"
    },
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        image: "https://cdn0.weddingwire.com/cat/10058611--mfvo10058611.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        image: "https://cdn0.weddingwire.com/cat/10058613--mfvo10058613.jpg"
    }
];

const ImageSlider: React.FC = () => {
    return (
        <Carousel autoPlay indicators>
            {items.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
}

const Item: React.FC<ItemProps> = ({ item }) => {
    return (
        <Paper>
            <img src={item.image} alt={item.name} style={{ width: '458px', height: '600px' }} />
            <h2>{item.name}</h2>
        </Paper>
    );
}

const BlogDetail: FC<Props> = (props) => {
    const { id } = useParams();

    return (
        <div id="ServiceDetail">
            <div className="container">
                <Container className='images-container'>
                    <ImageSlider />
                </Container>
                <div className="service-information">
                    <div className="information-container">
                        <h1 className="header">MADDOX - ALL WHO WANDER</h1>
                        <div className="underline"></div>
                        <div className="description">
                            <p className="description-header">Nội dung</p>
                            <div className="description-text">Find hair stylists and makeup artists to help you look your best on your wedding day.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail