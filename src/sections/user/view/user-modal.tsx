import React, { useState } from 'react';

import { Grid, Button, Dialog, MenuItem, Checkbox, TextField, Typography, DialogTitle, DialogActions, DialogContent, FormControlLabel, Avatar } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { Role, type User } from '../user-table-row'

interface UserData {
  user: User
}

export default function UserModal( { user } : UserData) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveData = () => {
    
    console.log('Saved data:');
    // Here you would typically send the data to a server or update your app's state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
  };
  return (
    <div>
      <MenuItem onClick={handleOpenModal}>
            <Iconify icon="solar:pen-bold" />
                Edit
          </MenuItem>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSaveData}>
          <DialogContent>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Avatar sx={{ width: 100, height: 100 }}  alt={user.firstName} src={user.picturePath} />
          </Grid> 
          <Grid item xs={12} sm={6}>
            {user.role.toString() === 'PLAYER' ? <Typography sx={{color: 'green'}}>CO-FUNDADOR</Typography> : <></>}
          </Grid> 
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="About User"
              name="aboutUser"
              multiline
              rows={4}
              value={user.aboutUser}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Clan"
              name="clan"
              value={user.clan}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nickname"
              name="nickName"
              value={user.nickName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Wallet"
              name="wallet"
              value={user.wallet}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Days"
              name="days"
              type="number"
              value={user.days}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.emailCheck}
                  onChange={handleChange}
                  name="emailCheck"
                />
              }
              label="Email Check"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.credentialsNonExpired}
                  onChange={handleChange}
                  name="credentialsNonExpired"
                />
              }
              label="Credentials Non Expired"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.clanOwner}
                  onChange={handleChange}
                  name="clanOwner"
                />
              }
              label="Clan Owner"
            />
          </Grid>
        </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </DialogActions>
        </form>

        </Dialog>
    </div>  
  );
}