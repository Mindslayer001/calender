import './Notifications.css';
import React, { useState, useEffect } from 'react';

interface Company {
  id: number;
  name: string;
  dueDate: string;
  status: string;
}

interface Notification {
  overdue: Company[];
  dueToday: Company[];
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification>({
    overdue: [
      { id: 1, name: 'Company A', dueDate: '2023-01-01', status: 'Overdue' },
      { id: 2, name: 'Company B', dueDate: '2023-01-05', status: 'Overdue' },
    ],
    dueToday: [
      { id: 5, name: 'Company C', dueDate: '2024-12-28', status: 'Due Today' },
      { id: 6, name: 'Company D', dueDate: '2024-12-28', status: 'Due Today' },
    ],
  });

  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewNotificationCount(0);
    }
  }, [isOpen]);

  const addNotification = () => {
    const newNotification: Company = {
      id: Date.now(),
      name: `Company ${String.fromCharCode(67 + newNotificationCount)}`,
      dueDate: new Date().toISOString().split('T')[0],
      status: 'New Notification',
    };
    setNotifications((prev) => ({
      ...prev,
      dueToday: [...prev.dueToday, newNotification],
    }));
    setNewNotificationCount((prev) => prev + 1);
  };

  const badgeCount = notifications.overdue.length + notifications.dueToday.length + newNotificationCount;

  return (
    <div className="notification-container">
      <div className="header-section" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="header-title">Notifications</h2>
        <div className="notification-icon">
          <div className="badge">{badgeCount}</div>
          <i className="fa fa-bell"></i>
        </div>
      </div>

      {isOpen && (
        <div className="grid-container">
          <div className="card overdue-card">
            <h3 className="card-title">Overdue Communications</h3>
            {notifications.overdue.length > 0 ? (
              <ul className="company-list">
                {notifications.overdue.map((company) => (
                  <li key={company.id} className="company-item">
                    <span className="company-name">{company.name}</span>
                    <span className="company-date">{company.dueDate}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No overdue communications.</p>
            )}
          </div>

          <div className="card today-card">
            <h3 className="card-title">Today's Communications</h3>
            {notifications.dueToday.length > 0 ? (
              <ul className="company-list">
                {notifications.dueToday.map((company) => (
                  <li key={company.id} className="company-item">
                    <span className="company-name">{company.name}</span>
                    <span className="company-date">{company.dueDate}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No communications due today.</p>
            )}
          </div>
        </div>
      )}

      <button className="add-notification-button" onClick={addNotification}>
        Add New Notification
      </button>
    </div>
  );
};

export default Notifications;
