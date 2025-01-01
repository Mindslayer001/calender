import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const modules = [
    { name: 'Login', icon: '🔑', path: '/login' },
    { name: 'User', icon: '👤', path: '/user' },
    { name: 'Notifications', icon: '🔔', path: '/notifications' },
    { name: 'Calendar', icon: '📅', path: '/calendar' },
    { name: 'Reporting', icon: '📊', path: '/reporting' },
    { name: 'Admin', icon: '⚙️', path: '/admin' },
  ];

  return (
    <div className="main-page">
      {/* Main Header */}
      <header className="main-header">
        <h1>Calendar Application for Communication Tracking</h1>
        {/* Module Names in a Row */}
        <div className="module-names">
          {modules.map((module) => (
            <button
              key={module.name}
              className="module-button"
              onClick={() => navigate(module.path)}
            >
              {module.name}
            </button>
          ))}
        </div>
      </header>

      {/* Content Layout */}
      <div className="content">
        {/* Sidebar for Icons */}
        <aside className="module-sidebar">
          {modules.map((module) => (
            <div
              key={module.name}
              className="module-icon"
              onClick={() => navigate(module.path)}
            >
              {module.icon}
            </div>
          ))}
        </aside>

        {/* Placeholder for Page Description */}
        <main className="module-placeholder">
          <p>Select a module to view its content.</p>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
