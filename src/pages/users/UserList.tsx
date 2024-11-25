import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Pagination,
  Container,
  ButtonGroup,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import AddEditForm from './AddEditForm';

interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
  },
  {
    id: 2,
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
  },
  {
    id: 3,
    avatar: 'https://reqres.in/img/faces/3-image.jpg',
    email: 'emma.wong@reqres.in',
    first_name: 'Emma',
    last_name: 'Wong',
  },
  {
    id: 4,
    avatar: 'https://reqres.in/img/faces/4-image.jpg',
    email: 'eve.holt@reqres.in',
    first_name: 'Eve',
    last_name: 'Holt',
  },
  {
    id: 5,
    avatar: 'https://reqres.in/img/faces/5-image.jpg',
    email: 'charles.morris@reqres.in',
    first_name: 'Charles',
    last_name: 'Morris',
  },
];

const UserList: React.FC = () => {
  const { login,status,error } = useAppSelector((state: RootState) => state.login);
  console.log(login,status,error, 'loginRes')
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    // Example filter logic (case-insensitive search)
    const filteredUsers = sampleUsers.filter(
      (user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Container
      maxWidth="lg" // Fixed width, options: xs, sm, md, lg, xl
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        padding: 3,
        mt: 5, // Add some margin on top for spacing
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Users
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="input search text"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton onClick={handleSearch} color="primary">
            <SearchIcon />
          </IconButton>
          {/* <Button variant="contained" color="primary">
            Create User
          </Button> */}
          <AddEditForm/>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        mb: 2
      }}>
        <ButtonGroup size="small" aria-label="Small button group">
          <Button size='small' variant="outlined" startIcon={<GridOnOutlinedIcon />}>
            Table
          </Button>
          <Button size='small' color='inherit' variant="outlined" startIcon={<ListOutlinedIcon />}>
            Card
          </Button>
        </ButtonGroup>
      </Box>

      {/* User Table */}
      <TableContainer
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.first_name} />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
        <Pagination
          count={3}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default UserList;
