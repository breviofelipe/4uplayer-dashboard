import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Alert,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { CONFIG } from 'src/config-global';
import { useAppSelector } from 'src/routes/hooks/hookes';

interface FormData {
  email: string;
  amountStake: string;
}

interface FormErrors {
  email: string;
  amountStake: string;
}

export default function FormModal() {
  const token = useAppSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [link, setLink] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    amountStake: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    amountStake: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setOpen(false);
    setFormData({ email: '', amountStake: '' });
    setErrors({ email: '', amountStake: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    if (name === 'email') {
      if (!value) {
        errorMessage = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Invalid email format';
      }
    } else if (name === 'amountStake') {
      if (!value) {
        errorMessage = 'Numeric value is required';
      } else if (value === '' || Number.isNaN(Number(value))) {
        errorMessage = 'Must be a number';
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.email && !errors.amountStake) {
      console.log('Form submitted:', formData);
      fetch(`${CONFIG.urlLogin}/profile/emails/new-cofunder`,{
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      }).then(async response => {
        if(response.ok){
          const body = await response.json();
          setLink(body.uniqueLink)
          setSuccess(true);
        } else {
          alert("Falha ao enviar formulario, entre em contato com o suporte!")
        }
      })
      .catch(() => alert("Falha ao enviar formulario, entre em contato com o suporte!"));
      
    }
  };

  return (
    <Box>
      <Button variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />} onClick={handleClickOpen}>
        New Cofunder
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ display: success ? 'flex' : 'none', borderRadius: 0 }}>
                Pre-cadastro realizado e email enviado! Link unico {link}
        </Alert>
        <DialogTitle>New Cofunder</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter the user email and a PLC stake value.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="dense"
              id="amountStake"
              name="amountStake"
              label="Stake PLC Value"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.amountStake}
              onChange={handleInputChange}
              error={!!errors.amountStake}
              helperText={errors.amountStake}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!!errors.email || !!errors.amountStake}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}