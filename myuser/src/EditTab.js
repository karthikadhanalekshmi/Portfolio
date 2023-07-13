import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';;

const EditTab = ({ selectedUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setCity(selectedUser.address.city);
    }
  }, [selectedUser]);

  const handleSave = () => {
    // Implement the logic to save/update the user details
    console.log('Save:', { name, email, city });
  };

  return (
    <div>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default EditTab;
