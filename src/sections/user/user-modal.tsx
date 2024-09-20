import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Switch, FormControlLabel, Select, MenuItem, Chip } from '@mui/material';

// Assuming you have these types defined elsewhere
import { User, Role } from './user-table-row';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (field: keyof User, value: any) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
      validateField(field, value);
    }
  };

  const validateField = (field: keyof User, value: any) => {
    let error = '';
    switch (field) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        }
        break;
      // Add more validations as needed
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSave = () => {
    if (editedUser && Object.values(errors).every(error => !error)) {
      onSave(editedUser);
      onClose();
    }
  };

  if (!editedUser) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editedUser.id ? 'Edit User' : 'Create User'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          value={editedUser.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          value={editedUser.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={editedUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={editedUser.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          margin="normal"
          label="About User"
          multiline
          rows={4}
          value={editedUser.aboutUser}
          onChange={(e) => handleChange('aboutUser', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Picture Path"
          value={editedUser.picturePath}
          onChange={(e) => handleChange('picturePath', e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Clan"
          value={editedUser.clan}
          onChange={(e) => handleChange('clan', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nickname"
          value={editedUser.nickName}
          onChange={(e) => handleChange('nickName', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="TikTok Link"
          value={editedUser.linkTiktok}
          onChange={(e) => handleChange('linkTiktok', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Instagram Link"
          value={editedUser.linkInstagram}
          onChange={(e) => handleChange('linkInstagram', e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Wallet"
          value={editedUser.wallet}
          onChange={(e) => handleChange('wallet', e.target.value)}
        />
        <Select
          fullWidth
          margin="dense"
          value={editedUser.role}
          onChange={(e) => handleChange('role', e.target.value as Role)}
          label="Role"
        >
          {Object.values(Role).map((role) => (
            <MenuItem value={role}>USER</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Switch
              checked={editedUser.emailCheck}
              onChange={(e) => handleChange('emailCheck', e.target.checked)}
            />
          }
          label="Email Verified"
        />
        <FormControlLabel
          control={
            <Switch
              checked={editedUser.clanOwner}
              onChange={(e) => handleChange('clanOwner', e.target.checked)}
            />
          }
          label="Clan Owner"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Days"
          type="number"
          value={editedUser.days}
          onChange={(e) => handleChange('days', parseInt(e.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;