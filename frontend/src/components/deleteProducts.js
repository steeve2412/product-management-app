import axios from 'axios';

export const deleteProduct = async (id, products, setProducts) => {
    try {
        await axios.delete(`http://localhost:4000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // Refresh the list after deletion or remove item from state
        setProducts(products.filter(product => product._id !== id));
    } catch (error) {
        console.error('Failed to delete product:', error.response);
    }
};
