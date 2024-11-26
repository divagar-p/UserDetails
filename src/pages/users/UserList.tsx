import React, { useEffect, useState } from 'react';
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
import { dispatch, RootState } from '../../redux/store';
import AddEditForm from '../../components/users/AddForm';
import { useNavigate } from 'react-router-dom';
import { userDelete, userList } from '../../redux/slice/UserSlice';
import UserTable from '../../components/users/UserTable';
import UserCardList from '../../components/users/UserCardList';
import EditForm from '../../components/users/EditForm';

interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAppSelector((state: RootState) => state);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedView, setSelectedView] = useState<string>('Table');
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchText, setSearchText] = useState('');
  const [editUser, setEditUser] = useState({ open: false, editUser: {} });
  const [page, setPage] = useState(1);


  useEffect(() => {
    dispatch(userList({ page: 1, per_page: 5 }));
  }, [])

  useEffect(() => {
    if (login?.status !== 'succeeded') {
      navigate('/Login');
    }
  }, [login?.status])


  useEffect(() => {
    if (user?.userListStatus === 'succeeded') {
      const data = user?.userList
      setUsers(data?.data);
      setTotalPage(data?.total_pages);
    }
  }, [user?.userListStatus])

  useEffect(() => {
    if (user?.userDeleteStatus === 'succeeded') {
      const data = user?.userDeleteStatus
    }
  }, [user?.userDeleteStatus])

  const handleSearch = () => {
    // Example filter logic (case-insensitive search)
    const filteredUsers = users?.filter(
      (user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleDelete = (id: number) => {
    // setUsers(users?.filter((user) => user.id !== id));
    dispatch(userDelete({ id: id }))
  };


  const onPagination = (value: any) => {
    setPage(value)
    dispatch(userList({ page: value, per_page: 5 }));
  }
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
          <AddEditForm />
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        mb: 2
      }}>
        <ButtonGroup size="small" aria-label="Small button group">
          <Button size='small' color={selectedView === 'Card' ? 'inherit' : 'primary'} variant="outlined" startIcon={<GridOnOutlinedIcon />} onClick={() => setSelectedView("Table")}>
            Table
          </Button>
          <Button size='small' color={selectedView === 'Table' ? 'inherit' : 'primary'} variant="outlined" startIcon={<ListOutlinedIcon />} onClick={() => setSelectedView("Card")}>
            Card
          </Button>
        </ButtonGroup>
      </Box>
      {selectedView === 'Table' ?
        <UserTable page={page} totalPage={totalPage} users={users} handleEdit={(val: number) => setEditUser({ open: true, editUser: val })} handleDelete={(val: number) => handleDelete(val)} onPagination={(val: number) => onPagination(val)} />
        : <UserCardList users={users} handleEdit={(val: number) => setEditUser({ open: true, editUser: val })} handleDelete={(val: number) => handleDelete(val)} />
      }
      <EditForm editUser={editUser} onClose={() => setEditUser({ open: false, editUser: {} })} />
    </Container>
  );
};

export default UserList;
