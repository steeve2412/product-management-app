import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/auth/signup', formData);
      console.log('Signup successful:', res.data);
      navigate('/login'); // Navigate to login page after signup
    } catch (error) {
      setError(error.response.data.message || 'Failed to signup'); // Adjusted to 'message' which is more common in error responses
      console.error('Signup error:', error.response.data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      <form onSubmit={onSubmit} className="mb-3">
        <div className="form-group">
          <label htmlFor="signupUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="signupUsername"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="signupPassword"
            placeholder="Create a password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
        {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
