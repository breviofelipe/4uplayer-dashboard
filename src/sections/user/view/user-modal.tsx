import React, { useState, useEffect, useCallback } from 'react';

import { Grid, Button, Dialog, Avatar, MenuItem, Checkbox, TextField, Typography, DialogActions, DialogContent, FormControlLabel } from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

import { type User } from '../user-table-row'

interface UserData {
  user: User
}

interface Wallet {
    id: string;
    address:  string ;
    amount: number;
    amountStack :number ;
    dateStackFinish :Date ;
}

export default function UserModal( { user } : UserData) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet, setWallet] = useState<Wallet>()
  const token = useAppSelector((state) => state.auth.token);
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

  const fetchWallet = useCallback(async () => {
    if(!wallet){
      const response = await fetch(`${CONFIG.urlUsers}/admin/wallet/${user.wallet}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();
        setWallet(body);
      }
    }
  },[wallet, user.wallet, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  useEffect(() => {
    fetchWallet()
  },[fetchWallet]);

  function formatNumberWithCommas(number : number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

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
          {wallet && <><Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Wallet PLC amount"
              name="wallet"
              value={wallet && formatNumberWithCommas(wallet.amount)}
              onChange={handleChange}
            />
           
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PLC HOLD"
              name="wallet hold"
              value={wallet && formatNumberWithCommas(wallet.amountStack)}
              onChange={handleChange}
            />
           
          </Grid></>}
          {wallet && wallet.dateStackFinish && <Grid item xs={12} sm={6}>
          <TextField
              fullWidth
              label="FINISH HOLD"
              name="dateFinish"
              value={wallet && formatDate(new Date(wallet.dateStackFinish))}
              onChange={handleChange}
            />
          </Grid>}
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
            {user.role.toString() !== 'PLAYER' && <Button onClick={handleCloseModal}>New Co-funder</Button>}
            <Button onClick={handleCloseModal}>Tranfer PLC</Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </DialogActions>
        </form>

        </Dialog>
    </div>  
  );
}