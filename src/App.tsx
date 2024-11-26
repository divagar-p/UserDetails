import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/users/UserList';

const App: React.FC = () => {
  return (
    <Router basename='UserDetails'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserList" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
