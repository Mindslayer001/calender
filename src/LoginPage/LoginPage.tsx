import './LoginPage.css';
import React, { useState } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

const defaultLoginCredentials: LoginCredentials = {
  username: 'admin',
  password: 'password',
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleLogin = () => {
    if (username === defaultLoginCredentials.username && password === defaultLoginCredentials.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. If you are a new user, please create an account.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCreateAccount = () => {
    setIsCreatingAccount(true);
  };

  const handleSubmitAccount = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Account Created Successfully!');
    setIsCreatingAccount(false); // Go back to login after account creation
  };

  const handleForgotPassword = () => {
    alert('Redirecting to the password recovery page...');
    // Logic for password recovery navigation can go here
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="welcome-card">
          <h1 className="welcome-message">Welcome, {username}!</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : isCreatingAccount ? (
        <div className="create-account-card">
          <h1 className="create-account-header">Create Account</h1>
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button className="create-account-btn" onClick={handleSubmitAccount}>
            Create Account
          </button>
          <button className="back-to-login-btn" onClick={() => setIsCreatingAccount(false)}>
            Back to Login
          </button>
        </div>
      ) : (
        <div className="login-card">
          <h1 className="login-header">Login</h1>
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="extra-options">
            <p onClick={handleForgotPassword} className="forgot-password">
              Forgot Password?
            </p>
            <button className="create-account-btn" onClick={handleCreateAccount}>
              Create an Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
