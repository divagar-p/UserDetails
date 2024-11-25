import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../redux/slice/LoginSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka')

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
    navigate('/UserList');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
      }}
    >
      <Box
        sx={{
          width: 350,
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          Log In
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined" onChange={(e) => setEmail(e.target.value)}
            defaultValue="eve.holt@reqres.in"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined" onChange={(e) => setPassword(e.target.value)}
            defaultValue="********"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
