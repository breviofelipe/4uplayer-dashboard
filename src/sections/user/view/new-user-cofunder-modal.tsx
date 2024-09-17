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
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

interface FormData {
  email: string;
  numericValue: string;
}

interface FormErrors {
  email: string;
  numericValue: string;
}

export default function FormModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    numericValue: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    numericValue: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ email: '', numericValue: '' });
    setErrors({ email: '', numericValue: '' });
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
    } else if (name === 'numericValue') {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.email && !errors.numericValue) {
      console.log('Form submitted:', formData);
      handleClose();
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
              id="numericValue"
              name="numericValue"
              label="Stake PLC Value"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.numericValue}
              onChange={handleInputChange}
              error={!!errors.numericValue}
              helperText={errors.numericValue}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!!errors.email || !!errors.numericValue}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}