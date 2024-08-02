import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const UpdateProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    logo: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleLogoChange = () => {
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setProfile({
    //     ...profile,
    //     logo: reader.result
    //   });
    // };
    // reader.readAsDataURL(file);
  };

  const handleUpdateInfo = () => {
    // Handle the logic for updating user information
    console.log('Updating user info:', profile.name, profile.phone, profile.address);
  };

  const handleChangePassword = () => {
    if (profile.password === profile.confirmPassword) {
      // Handle the logic for changing the password
      console.log('Changing password to:', profile.password);
    } else {
      console.error('Passwords do not match!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Update Logo
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={profile.logo}
              alt="Profile Logo"
              sx={{ width: 100, height: 100 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-logo"
              type="file"
              onChange={handleLogoChange}
            />
            <label htmlFor="upload-logo">
              <Button variant="contained" color="primary" component="span" style={{ marginTop: '10px' }}>
                Upload Logo
              </Button>
            </label>
          </Box>
        </Paper>

        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Update Information
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateInfo}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Update Information
          </Button>
        </Paper>

        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <TextField
            label="New Password"
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={profile.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Change Password
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default UpdateProfile;
