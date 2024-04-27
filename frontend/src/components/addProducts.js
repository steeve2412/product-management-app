import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddProduct({ onAddProduct }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const { name, price, description } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };
            const body = JSON.stringify(formData);
            const response = await axios.post('http://localhost:4000/api/products', body, config);

            // Call the onAddProduct prop with the added product
            onAddProduct(response.data);

            // Set success message and clear form
            setSuccessMessage('Product added successfully!');
            setFormData({ name: '', price: '', description: '' });

            // Remove the success message after some time
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            
        } catch (error) {
            console.error('Error adding product:', error.response);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Product</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={onSubmit} className="mb-3">
                <div className="form-group">
                    <label htmlFor="productName">Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter product name" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Price</label>
                    <input type="text" className="form-control" id="productPrice" placeholder="Enter price" name="price" value={price} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Description</label>
                    <textarea className="form-control" id="productDescription" placeholder="Enter product description" name="description" value={description} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
