import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error.response?.data || 'Server error');
      }
    };
    fetchProducts();
  }, []);

  const navigateToProductManagement = () => {
    if (token) {
      navigate('/product-management');
    } else {
      // If the user isn't logged in, show a message or redirect to the login page
      navigate('/login', { state: { from: 'products' }, replace: true });
    }
  };

  return (
    <div className="container mt-4">
      <h1>Tersano Products</h1>
      <div className="text-center mt-4">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>There are no products to show right now.</p>
        )}
      </div>
      <div className="text-center mt-4">
        {/* <button onClick={navigateToProductManagement} className="btn btn-primary">
          Product Management
        </button> */}
      </div>
    </div>
  );
};

export default ProductsList;
