// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage.tsx';
import LoginPage from './LoginPage/LoginPage.tsx'; // Ensure the path is correct
import UserModule from './UserModule/UserModule.tsx'; // Replace with actual paths
import Notifications from './Notifications/Notifications.tsx'; // Replace with actual paths
import Calendar from './CalendarView/CalendarView.tsx'; // Replace with actual paths
import Reporting from './ReportingAndAnalyticsModule/ReportingAndAnalyticsModule.tsx'; // Replace with actual paths
import AdminModule from './AdminModule/AdminModule.tsx'; // Import the Admin Module

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/react-gh-pages" element={<MainPage />} />
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
