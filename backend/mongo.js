const mongoose = require('mongoose');
const User = require('./models/user'); // Make sure the path to your model is correct

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/productManagementDB')
  .then(() => {
    console.log('Connected to MongoDB');
    return checkUsers(); // Call a function to perform database operations
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

async function checkUsers() {
  try {
    const users = await User.find(); // Use async/await to handle the promise
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    mongoose.disconnect(); // Disconnect after operations are complete
  }
}
