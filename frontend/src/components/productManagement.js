import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddProduct from './addProducts';
import '../index.css';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/products');
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(newSelectedProducts);
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedProducts.map(id => 
        axios.delete(`http://localhost:4000/api/products/${id}`)
      ));
      setSuccessMessage('Selected products have been successfully deleted.');
      fetchProducts();
      setSelectedProducts([]); 
    } catch (error) {
      console.error("Failed to delete products", error);
    }
  };

  const handleAddProductSuccess = (newProduct) => {
    setProducts([...products, newProduct]);
    setSuccessMessage('Product added successfully!');
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Product Management</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {products.length > 0 ? (
        <div className="list-group">
          {products.map(product => (
            <div key={product._id} className={`list-group-item ${selectedProducts.includes(product._id) ? 'list-group-item-primary' : ''}`} onClick={() => handleSelectProduct(product._id)}>
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
      <button onClick={handleDeleteSelected} disabled={selectedProducts.length === 0} className="btn btn-danger mt-3">
        Delete Selected
      </button>
      {/* Pass the success handler to AddProduct */}
      <AddProduct onAddProduct={handleAddProductSuccess} />
    </div>
  );
};

export default ProductManagementPage;
