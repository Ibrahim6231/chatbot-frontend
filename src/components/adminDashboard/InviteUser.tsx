import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './InviteUser.scss';
import toast from 'react-hot-toast';
import { sendInviteApi } from '../../api/admin';

const InviteUser = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [inviteLink, setInviteLink] = useState("")

  const handleInvite = async () => {
    if (!email.length) {
      toast.error("Please enter email");
      return;
    }

    const resp = await sendInviteApi({ email, role })
    if (resp) {
      setMessage(`Invitation sent to ${email} as ${role}`);
      setEmail('');
      setRole('');
      setInviteLink(resp.link)
      toast.success("Invite email send to new user");
    }
  };

  return (
    <Box className="invite-container">
      <Typography variant="h5" gutterBottom className="invite-title">
        Invite a User
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        className="invite-input"
      />
      <FormControl fullWidth margin="normal" className="invite-input">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleInvite}
        fullWidth
        className="invite-button"
      >
        Send Invite
      </Button>
      {message && (
        <Typography variant="body1" className="invite-message">
          {message}
          {inviteLink && <>
            <br /> 
            <br /> 
            <a className='app-link' href={inviteLink}>{inviteLink}</a>
            <br/>
            <i>Please note that this link is provided here temporarily. As part of this assignment, I am not utilizing a SendGrid plan to send emails.<br/>
            Therefore, the invite link is displayed below. You may click on or share this link with the new user to complete their registration:
            </i>
          </>}
        </Typography>
      )}
    </Box>
  );
};

export default InviteUser;
