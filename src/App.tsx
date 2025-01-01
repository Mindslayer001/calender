// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage/LoginPage'; // Ensure the path is correct
import UserModule from './UserModule/UserModule'; // Replace with actual paths
import Notifications from './Notifications/Notifications'; // Replace with actual paths
import Calendar from './CalendarView/CalendarView'; // Replace with actual paths
import Reporting from './ReportingAndAnalyticsModule/ReportingAndAnalyticsModule'; // Replace with actual paths
import AdminModule from './AdminModule/AdminModule'; // Import the Admin Module

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserModule />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/admin" element={<AdminModule />} /> {/* Add the Admin Module route */}
      </Routes>
    </Router>
  );
};

export default App;
