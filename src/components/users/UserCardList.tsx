import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  avatar: string;
  email: string;
  name: string;
}

const UserCardList = (props: { users: any, handleEdit: (val: any) => void, handleDelete: (val: any) => void }) => {
  const { users, handleEdit, handleDelete } = props;

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={3}>
        {users.map((user: any) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: 3,
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Hover Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <IconButton
                  sx={{ backgroundColor: 'primary.main', color: 'white', mx: 1 }}
                  onClick={() => handleEdit(user)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{ backgroundColor: 'error.main', color: 'white', mx: 1 }}
                  onClick={() => handleDelete(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              {/* Card Content */}
              <CardContent sx={{ textAlign: 'center', zIndex: 2 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 72,
                    height: 72,
                    margin: '0 auto',
                    mb: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: 'text.primary' }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserCardList;
