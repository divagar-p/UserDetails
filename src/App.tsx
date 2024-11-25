import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/users/UserList';
import UserCardList from './pages/users/UserCardList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/UserCardList" element={<UserCardList />} />
      </Routes>
    </Router>
  );
};

export default App;
