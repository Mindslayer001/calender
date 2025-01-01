import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToModule = (module: string) => {
    navigate(`/${module}`);
  };

  return (
    <div className="main-page">
      <h1>Calendar Application for Communication Tracking</h1>
      <div className="modules">
        <div className="module" onClick={() => navigateToModule('login')}>
          <h2>Login Page</h2>
          <p>Access your account and manage your communications.</p>
        </div>
        <div className="module" onClick={() => navigateToModule('user')}>
          <h2>User Module</h2>
          <p>Visualize, manage, and perform communication tasks.</p>
        </div>
        <div className="module" onClick={() => navigateToModule('notifications')}>
          <h2>Notifications Module</h2>
          <p>Stay updated with important alerts.</p>
        </div>
        <div className="module" onClick={() => navigateToModule('calendar')}>
          <h2>Calendar Module</h2>
          <p>Manage your calendar events efficiently.</p>
        </div>
        <div className="module" onClick={() => navigateToModule('reporting')}>
          <h2>Reporting and Analytics Module</h2>
          <p>Gain actionable insights from your data.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
