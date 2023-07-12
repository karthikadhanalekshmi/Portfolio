import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { saveAs } from 'file-saver';

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
    setFilteredUsers(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSortChange = (event) => {
    const column = event.target.value;
    setSortColumn(column);
    sortUsers(column);
  };

  const handleFilterChange = (event) => {
    const column = event.target.value;
    setFilterColumn(column);
    setFilterValue('');
    setFilteredUsers(users);
  };

  const handleFilterValueChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    filterUsers(filterColumn, value);
  };

  const sortUsers = (column) => {
    let sortedUsers = [...filteredUsers];
    sortedUsers.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      }
      if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  const filterUsers = (column, value) => {
    if (column === '') {
      setFilteredUsers(users);
      return;
    }
  
    const filteredUsers = users.filter((user) => {
      const columnValue = user[column];
      if (typeof columnValue === 'string') {
        return columnValue.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setFilteredUsers(filteredUsers);
  };

  const exportToCSV = () => {
    const csvData = filteredUsers.map(
      (user) => `${user.id},${user.name},${user.username},${user.email}`
    ).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'users.csv');
  };

  return (
    <div>
      <div>
        <FormControl sx={{ minWidth: 120, marginRight: 10 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortColumn} onChange={handleSortChange}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={filterColumn} onChange={handleFilterChange}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
        {filterColumn !== '' && (
          <TextField
            label="Filter Value"
            value={filterValue}
            onChange={handleFilterValueChange}
            variant="outlined"
            sx={{ marginLeft: 10 }}
          />
        )}
      </div>
      <Button variant="contained" onClick={exportToCSV}>
        Export to CSV
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserGrid;
