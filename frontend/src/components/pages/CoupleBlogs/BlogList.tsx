// Blog.tsx
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router';

interface BlogPost {
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Orca Vector Graphics Backend',
    author: 'Martin Fouilleul',
    date: '2024-04-26',
    content: 'Orca provides a canvas API out of the box, which allows apps to draw 2D vector graphics...',
    imageUrl: 'https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg',
  },
  {
    title: 'April Update',
    author: 'Martin Fouilleul',
    date: '2024-04-11',
    content: 'We’ve been flying under the radars for the past three months and just landed some big changes...',
    imageUrl: 'https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg',
  },
  {
    title: 'End of Year Recap',
    author: 'Martin Fouilleul',
    date: '2023-12-27',
    content: 'I’ve been working on Orca for almost a full year, and since 2023 is wrapping up it’s as good a time as ever...',
    imageUrl: 'https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg',
  },
  {
    title: 'License, Hosting and Sponsorship',
    author: 'Martin Fouilleul',
    date: '2023-10-11',
    content: 'Here’s a couple non-technical updates about the Orca project. In short: we are adopting a more permissive license...',
    imageUrl: 'https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg',
  },
];

const BlogList: React.FC = () => {
  const navigate = useNavigate();
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
        {blogPosts.map((post, index) => (

            <Card 
            onClick={() => {
              navigate("/blogs/details/sdfa");
            }}

            sx={{my:2,  display: 'flex',
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
                image={post.imageUrl}
                alt={post.title}
              />
              <CardContent sx={{textAlign: 'left'}}>
                <Typography variant="h4" fontWeight={600} sx={{color: 'var(--primary-color)'}}>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  By {post.author} — {post.date}
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
