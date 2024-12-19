const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const { User } = require('./models/Users'); 
const app = express();

app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // Enables parsing of URL-encoded form data
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(express.static(path.join(__dirname, '../Frontend/build')));

app.get('/LandingPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages', 'LangingPage.js'));
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipe_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  
  // MongoDB connection error handling
  db.on('error', console.error.bind(console, '❌ Connection error:'));
  db.once('open', () => {
    console.log('✅ Connected to MongoDB');
  });
  
  app.get('/test', async (req, res) => {
    res.json( "Works" );
      
  });

  app.post('/add-user', async (req, res) => {
    try {
      const { username, email, password } = req.body;


      const Email = await User.findOne({ email });
      if (Email) {
         return res.json({ error: "This email already belongs to an account" });
      }

      
      const user = await User.findOne({ username });
      if (user) {
         return res.json({ error: "User already exists" });
        
      }

 

      //Create user
      const newUser = new User({ username, email, password});
      await newUser.save();

      
      res.json({ message: "User created successfully" });
     
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
     
      const user = await User.findOne({ username });
      if (user) {
        const fulluser = await User.findOne({ username, password });
              if (fulluser){
                
                  return res.json({ message: "User Logged In Successfully" });
                 
              }
              else
               return res.json({ error: "Password does not match our database" });
        
      }
      
      res.json({ error: "User does not exist create an account" });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  });



  // Start the server
const PORT = process.env.PORT || 8001; // Use environment variable or default to 8001
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});


module.exports = app;