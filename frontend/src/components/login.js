import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
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
      const res = await axios.post('http://localhost:4000/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/productlist'); // Redirect to products page after successful login
    } catch (error) {
      setError(error.response.data.error || 'Failed to login');
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className="container mt-4">
        <h2>Login</h2>
        <form onSubmit={onSubmit} className="mb-3">
            <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input type="text" className="form-control" id="loginUsername" placeholder="Enter username" name="username" value={username} onChange={onChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" name="password" value={password} onChange={onChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
        </form>
    </div>
);
}

export default Login;
