// client/src/components/StaffLoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffLoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [staffId, setStaffId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, name, staffId };
    console.log('Submitting staff login payload:', payload);
    try {
      const response = await axios.post('https://access-puzzle-backend.onrender.com/api/auth/staff-login', payload);
      onLogin(response.data); // Save token and user details
      // Redirect to the staff puzzle editor page
      navigate('/admin/puzzle-editor');
    } catch (err) {
      console.error('Staff login error:', err.response?.data);
      setError(err.response?.data?.msg || 'Login failed.');
    }
  };

  return (
    <div className="login-page">
      <h2>Staff Login</h2>
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
        <input
          type="text"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default StaffLoginPage;
