// Blog.tsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import { getBlogsList } from '../../../api/CoupleAPI';


const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState<any[]>([])

  const getData = async() =>{
    const response = await getBlogsList({
      pageNo : 0,
      pageSize : 10
  })
    setBlogsList(response)
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <Box mx={40}>
      <Typography variant="h2" fontWeight={600} m={4} sx={{color: "var(--primary-color)"}}>
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
          Cẩm nang cưới
        </Divider>
        </Typography>
        {blogsList.map((post, index) => (

            <Card 
            onClick={() => {
              navigate("/blogs/details/"+ post);
            }}

            sx={{my:2,  display: 'flex',
              cursor: 'pointer',
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "transform 0.2s",
              },
            }}
            elevation={4}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 140,
                  width: 140
                }}
                image={post?.listImages[0]}
                alt={post.title}
              />
              <CardContent sx={{textAlign: 'left'}}>
                <Typography variant="h4" fontWeight={600} sx={{color: 'var(--primary-color)'}}>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Bởi {"post.author"} — {post.createAt}
                </Typography>
                <Typography sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 12,
                }}>
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
        ))}
    </Box>
  );
};

export default BlogList;
