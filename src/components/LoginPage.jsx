// client/src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = ({ onLogin }) => {
  //const [isStaff, setIsStaff] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [staffId, setStaffId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint ='/api/auth/player-login';
    const payload = { email, name };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/player-login`, // Use environment variable
        payload
      );      
      onLogin(response.data);
      // Redirect to the crossword puzzle page
      navigate('/game');
    } catch (err) {
      console.error('Login error:', err.response?.data);
      setError(err.response?.data?.msg || 'Login failed.');
    }
  };

  return (
    <div className="login-page">
      <h2>{'Player Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Are you a staff member? <Link to="/staff-login">Click here for staff login</Link>
      </p>
    </div>
  );
};

export default LoginPage;
