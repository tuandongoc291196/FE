import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Container,
  Link
} from '@mui/material';
import { title } from 'process';

export interface BlogDetailProps {
  author: string;
  date: string;
  title: string;
  content: string;
  avatar: string;
}
 


const BlogDetails: React.FC = () => {
  const title =" sdafsf"
  const author = ""
  const avatar = "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg"
  const date = "2022-01-01"
  const content = "sdfa"
  return (
    <Container style={{ padding: '20px' }}>
      <Box
        style={{
          backgroundImage: 'url(/path-to-your-image.jpg)', // Đổi thành đường dẫn đến ảnh background của bạn
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '40px 20px',
        }}
      >
        <Typography variant="h3" component="h1">
          Orca Vector Graphics Backend
        </Typography>
        <Box display="flex" alignItems="center" marginTop="10px">
          <Avatar
            src="/path-to-avatar.jpg" // Đổi thành đường dẫn đến ảnh đại diện của tác giả
            alt="Author"
            style={{ width: '50px', height: '50px' }}
          />
          <Box marginLeft="10px">
            <Typography variant="body1">
              By Martin Fouilleul — 2024-04-26
            </Typography>
          </Box>
        </Box>
      </Box>
      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="body1" component="p">
          This post describes the vector graphics renderer of Orca. For previous posts about my exploration of different vector graphics rendering techniques, you can see <Link href="#">this series</Link>.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" component="p">
          Orca provides a canvas API out of the box, which allows apps to draw 2D vector graphics, and also powers the rendering of the UI system. Users can build paths from line segments and Bézier curves, and fill or stroke paths using a number of attributes such as the path color, gradient, texture, line width, etc.
        </Typography>
        <Typography variant="body1" component="p">
          Here is an example of what some simple drawing code might look like:
        </Typography>
        <Box
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflowX: 'auto',
          }}
        >
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetails;
