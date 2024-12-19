
// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipe_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, '❌ Connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// Define User Schema
const userSchema = new mongoose.Schema({
    
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: {
    data: Buffer,
    contentType: String,
  },

});

// Create User Model
const User = mongoose.model('User', userSchema);


// Export the functions
module.exports = { User};
