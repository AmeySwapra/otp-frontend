import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    try {
      const response = await axios.post('https://otp-backend-pc9h.onrender.com/api/users/send-code', { phone: formattedPhone });
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    try {
      const response = await axios.post('https://otp-backend-pc9h.onrender.com/api/users/verify-code', { phone: formattedPhone, code: otp });
      setMessage(response.data.message);

      if (response.data.message === 'Verification successful') {
        alert('Phone verified successfully!');
        setStep(1);
        setPhone('');
        setOtp('');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to verify OTP');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        overflow: 'hidden',
        padding: '16px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '32px',
          maxWidth: '400px',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          OTP Verification
        </Typography>
        {message && <Typography color="error" mb={2}>{message}</Typography>}
        {step === 1 ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Enter Phone Number
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSendOtp} fullWidth>
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Enter OTP
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleVerifyOtp} fullWidth>
              Verify OTP
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default App;
