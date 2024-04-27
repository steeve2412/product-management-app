import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import ProductsList from './components/productsList';
import ProductManagementPage from './components/productManagement';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // Effect to update authToken when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Tersano</Link>
        <div className="navbar-nav">
          {!authToken && (
            <>
              <Link className="nav-item nav-link" to="/login">Login</Link>
              <Link className="nav-item nav-link" to="/signup">Signup</Link>
            </>
          )}
          {authToken && (
            <>
              <Link className="nav-item nav-link" to="/products">Product Management</Link>
              <button onClick={handleLogout} className="nav-item nav-link btn btn-link">Logout</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={authToken ? <ProductManagementPage /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<ProductsList />} />
      </Routes>
    </Router>
  );
};

export default App;
