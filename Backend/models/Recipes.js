// Import Mongoose
const mongoose = require('mongoose');

// Define Listings Schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps:[{
    type: String
  }],
  photo: {
    data: { type: Buffer, },          // Ensuring the photo data is required
    contentType: { type: String},   // Ensuring the content type (MIME type) is required
  },
  user: { type: String, required: true },  // This will be filled in upon creation of listings by session username
  date: { type: Date, default: Date.now },
  tags: { type: [String], default: [] }, // Array of tags, default to empty array
});

function addDate(){
  date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}




// Create Listing Model
const Recipe = mongoose.model('Recipe', recipeSchema);


// Export the Listing model
module.exports = { Recipe, addDate };
