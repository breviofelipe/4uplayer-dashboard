import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { useAppDispatch } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { login, logout } from 'src/features/auth/authSlice';

import { Iconify } from 'src/components/iconify';
import LoadingComponent from 'src/components/loading/Loading';


// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const urlEnv = CONFIG.urlLogin;
  const loginFetch = async () => {
    setLoading(true);
    const values = {
      email: username,
      password
    }

    const loggedInResponse = await fetch(`${urlEnv}/auth/login-dashboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

      const {status} = loggedInResponse;
      
      if(status === 200){
        const loggedIn = await loggedInResponse.json();
        dispatch(login({username : loggedIn.user.firstName, picturePath: loggedIn.user.picturePath, email: loggedIn.user.email, token: loggedIn.token,}))
        router.push('/'); 
      } else{
        setError(true);
      }
      setLoading(false);
  }

  const handleLogin = () => {
    if (username) {
      loginFetch();
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isErro, setError] = useState(false);
  useEffect(() => handleLogout());


  
  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
   
      <TextField
        fullWidth
        name="email"
        label="Email address"
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleLogin}
      >
        {!loading ? <>Sign in</> : <LoadingComponent />}
        
      </LoadingButton>
    </Box>
  );

  return (
    <>
       
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        
      </Box>

      <Alert severity="error" sx={{ display: isErro ? 'block' : 'none', borderRadius: 0, mb: 2 }}>
                Email/Passoword wrong!
      </Alert>
      {renderForm}
    </>
  );
}
