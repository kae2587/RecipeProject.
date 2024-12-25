const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require( 'bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { User } = require('./models/Users'); 
const { Recipe } = require('./models/Recipes'); 

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
  

  async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds, higher is more secure but slower
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
  
    return hash;
  }

// Define a session secret key
const SESSION_SECRET = 'your_secret_key_here';

app.use(session({
  secret: SESSION_SECRET,
  resave: false, // Prevents resaving session if nothing changed
  saveUninitialized: false, // Prevents saving uninitialized sessions
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/recipe_project', // MongoDB connection string
    collectionName: 'sessions', // Collection to store sessions
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    httpOnly: true, // Prevents client-side script access
    secure: false, // Set to true if using HTTPS
  },
}));



  app.get('/test', async (req, res) => {
    res.json( "Works" );
      
  });


  app.get('/returnusername', (req, res) => {
    if (req.session.username) {
      
      res.json({ username: req.session.username });
      
    } else {
      console.log("Not Saving");
      res.status(401).json({ error: "User not logged in" });
    }
  });



  app.post('/adduser', async (req, res) => {
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

      const hashpassword = await hashPassword(password);
      //Create user
      const newUser = new User({ username, email, password: hashpassword});
      await newUser.save();

      req.session.username = username;
      res.json({ message: "User created successfully" });
     
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  });


  app.post('/addrecipe', async (req, res) => {
    try {
      const { title, description , username, steps } = req.body;
      
      const user = await User.findOne({ username });
      if (user) {
        // return res.json({ error: "User already exists" });
        const newRecipe = new Recipe({title, description , steps, user});
        await newRecipe.save();
        res.json({ message: "User created successfully" });
        
      }

     
    } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ error: 'An error occurred while adding the recipe' });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
     
      const user = await User.findOne({ username });
      if (user) {
        
   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.json({ error: "Invalid password" });
        }

        else {
          req.session.username = username;
          return res.json({ message: "User Logged In Successfully" });
        }

      }
      
      res.json({ error: "User does not exist, create an account" });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  });


  app.post('/getRecipes', async (req, res) => {

    try {
    
      const { username } = req.body;
      const user = await User.findOne({ username });
      const filter = { user };
        
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);
        //console.log(listings);
        
        const transformedListings = listings.map((listing, index) => {
          return {
            title: listing.title,
            user: listing.user, // Include the user field in the response
            description: listing.description,
            date: listing.date,
            _id: listing._id,
            id: index,
          };
        });
     

      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Recipes:', error);
      res.status(500).send('Error fetching Recipes');
    }

  });


  app.post('/getCertainRecipe', async (req, res) => {

    try {
    
      const { _id } = req.body;
      const filter = { _id };
        
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);
        //console.log(listings);
        
        const transformedListings = listings.map((listing) => {
          return {
            title: listing.title,
            user: listing.user, // Include the user field in the response
            description: listing.description,
            date: listing.date,
            _id: listing._id,
            steps: listing.steps,
          };
        });
     

      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Recipes:', error);
      res.status(500).send('Error fetching Recipes');
    }

  });


  app.post('/getSteps', async (req, res) => {

    try {
    
      const { _id } = req.body;
      const filter = { _id };
        
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);
        //console.log(listings);
        
        const transformedListings = listings.map((listing) => {
          return {
            steps: listing.steps,
          };
        });
     
      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Steps:', error);
      res.status(500).send('Error fetching Steps');
    }

  });







  // Start the server
const PORT = process.env.PORT || 8001; // Use environment variable or default to 8001
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});


module.exports = app;



