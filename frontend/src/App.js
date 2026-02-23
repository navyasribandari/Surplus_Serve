import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import DonorPage from './DonorPage';
import ReceiverPage from './ReceiverPage';
import VolunteerPage from './VolunteerPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leaderboard from './Leaderboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/receiver" element={<ReceiverPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        

      </Routes>
    </Router>
  );
};

export default App;
