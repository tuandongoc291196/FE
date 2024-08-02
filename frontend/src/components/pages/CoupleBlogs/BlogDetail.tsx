import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Avatar
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
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h3" gutterBottom>{title}</Typography>
      <Box display="flex" alignItems="center" marginBottom="10px">
        <Avatar src={avatar} alt={author} />
        <Box marginLeft="10px">
          <Typography variant="h6">{author}</Typography>
          <Typography variant="body2" color="textSecondary">{date}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" paragraph>{content}</Typography>
    </Paper>
  );
};

export default BlogDetails;
