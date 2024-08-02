import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Modal,
  Grid,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { truncatedText } from "../../../../utils/Utils";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import EmailIcon from '@mui/icons-material/Email';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface RequestPricePopupProps {
  open: boolean;
  handleClose: () => void;
}

const RequestPricePopup: React.FC<RequestPricePopupProps> = ({
  open,
  handleClose,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="h6"
              style={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {truncatedText(
                "Tên dịch vụ Tên dịch vụTên dịch vụTên dịch vụTên dịch vụ"
              )}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h3">
              Message vendor
            </Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 12 }}>
          Fill out the form below to request information from Sound Originals
          Photo & Video.
        </Typography>
        <TextField
          fullWidth
          label="First and last name"
          margin="normal"
          variant="outlined"
          defaultValue="Lý Duy"
          InputProps={{
            style: { fontSize: 16 },
            endAdornment: (
              <InputAdornment position="end">
                  <Person2RoundedIcon sx={{fontSize: 24}}/>
              </InputAdornment>
          ),
          }}
          InputLabelProps={{
            style: { fontSize: 14 },
            
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          defaultValue="lyhieuduy9190@gmail.com"
          InputProps={{
            style: { fontSize: 16 },
            endAdornment: (
              <InputAdornment position="end">
                  <EmailIcon sx={{fontSize: 24}}/>
              </InputAdornment>
          ),
          }}
          InputLabelProps={{
            style: { fontSize: 14 },
          }}
        />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          fullWidth
          label="Phone number (Optional)"
          margin="normal"
          variant="outlined"
          InputProps={{
            style: { fontSize: 16 },
            endAdornment: (
              <InputAdornment position="end">
                  <PhoneRoundedIcon sx={{fontSize: 24}}/>
              </InputAdornment>
          ),
          }}
          InputLabelProps={{
            style: { fontSize: 14 },
          }}
        />
          </Grid>
        </Grid>
        
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Event Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            openPickerIcon: {
                sx: { fontSize: 24 },
            },
        }}
          slots={{
            textField: (params) => (
                <TextField 
                    {...params} 
                    sx={{ 
                        '& .MuiInputBase-root': { fontSize: 16 },
                        '& .MuiFormLabel-root': { fontSize: 16 }
                    }} 
                />
            )
        }}
        />
      </DemoContainer>
    </LocalizationProvider>
        
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          defaultValue="We are currently planning for our wedding on 12/20/2025 and would like to learn more about your business. Could you send us some additional information? Thank you!"
          InputProps={{
            style: { fontSize: 16 },
          }}
          InputLabelProps={{
            style: { fontSize: 14 },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleClose}
          sx={{
            mt: 3,
            fontSize: 16,
            fontWeight: 600,
            py: 1.2,
            backgroundColor: "var(--primary-color)",
            "&:hover": {
            backgroundColor: "var(--btn-hover-color)",
            }
          }}
        >
          Gửi
        </Button>
      </Box>
    </Modal>
  );
};

export default RequestPricePopup;
