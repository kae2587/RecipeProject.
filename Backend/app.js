// Load environment variables from .env (for local dev)
require('dotenv').config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//const bcrypt = require('bcrypt');
const bcrypt = require("bcryptjs");

const session = require('express-session');
const MongoStore = require('connect-mongo');
const multer = require("multer");
const starterRecipes = require('./seedData');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const User = require('./models/Users');
const { Recipe } = require('./models/Recipes'); 

const app = express();
require('dotenv').config();

// Middleware
app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));


app.use(cors({
  origin: "https://recipeprojecttwo.web.app",  // your Firebase Hosting URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.static(path.join(__dirname, '../Frontend/build')));

// Route to test frontend serving
app.get('/LandingPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages', 'LangingPage.js'));
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;  // match your .env variable


mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Sessions AFTER DB is connected
    const SESSION_SECRET = process.env.SESSION_SECRET || 'your_secret_key_here';

    // app.use(session({
    //   secret: SESSION_SECRET,
    //   resave: false,
    //   saveUninitialized: false,
    //   store: MongoStore.create({
    //     mongoUrl: mongoURI,
    //     collectionName: 'sessions',
    //   }),
    //   cookie: {
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: true,
    //     secure: false, // set true in production (https)
    //   },
    // }));


    // app.use(session({
    //   secret: SESSION_SECRET,
    //   resave: false,
    //   saveUninitialized: false,
    //   store: MongoStore.create({
    //     mongoUrl: mongoURI,
    //     collectionName: 'sessions',
    //   }),
    //   cookie: {
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: true,
    //     secure: true,                
    //     sameSite: 'none',   
    //     domain: "recipeproject-2.onrender.com",        
    //   },
    // }));
    app.set("trust proxy", 1); 

    app.use(session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: mongoURI,
        collectionName: 'sessions',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ true in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" // ✅ needed for Chrome
      },
    }));
    


    // --- Routes go here ---

    app.get('/test', (req, res) => {
      res.json("Works");
    });

    app.get('/returnusername', (req, res) => {
      if (req.session.username) {
        res.json({ username: req.session.username });
      } else {
        res.status(401).json({ error: "User not logged in" });
      }
    });

    // Add user
    app.post('/adduser', async (req, res) => {
      try {
        const { username, email, password } = req.body;

        if (await User.findOne({ email })) {
          return res.json({ error: "This email already belongs to an account" });
        }
        if (await User.findOne({ username })) {
          return res.json({ error: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hash });
        await newUser.save();



        // Seed starter recipes for THIS user
        const userRecipes = starterRecipes.map(recipe => ({
          ...recipe,
          user: username, // attach the username of the new account
        }));
        await Recipe.insertMany(userRecipes);






        req.session.username = username;
        res.json({ message: "User created successfully" });
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user' });
      }
    });

  app.post("/addrecipe", upload.single("photo"), async (req, res) => {
    try {
      const { title, description , username, breakfast, lunch, dinner} = req.body;
      const steps = req.body.steps ? [].concat(req.body.steps) : [];
      const users = await User.findOne({ username });
        
        
      if(users){
      const recipe = new Recipe({
        title,
        description,
        steps,
        user: username,
        photo: req.file
          ? {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            }
          : undefined,
          breakfast,
          lunch,
          dinner,
      });
      await recipe.save();
      res.json({ message: "Recipe created successfully" });
    }

      
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating recipe');
    }
  });



    
  app.post("/editrecipe", upload.single("photo"), async (req, res) => {
    try {
      const { title, description, username, steps, _id , breakfast, lunch, dinner} = req.body;


      const user = await User.findOne({ username });

      if (user) {
        const updateResult = await Recipe.updateOne(
          { _id },
          { 
            $set: { 
              title: title,
              description: description,
              steps: steps,
              photo: req.file
              ? {
                  data: req.file.buffer,
                  contentType: req.file.mimetype,
                }
              : undefined,
              breakfast,
              lunch,
              dinner,

            } 
          }
        );
  
        res.status(200).send("Recipe updated successfully");
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).send("Error updating recipe");
    }
  });





  // app.post('/editrecipe', async (req, res) => {
  //   try {
  //     const { title, description, username, steps, _id } = req.body;

  //     const user = await User.findOne({ username });
  
  //     if (user) {
  //       const updateResult = await Recipe.updateOne(
  //         { _id },
  //         { 
  //           $set: { 
  //             title: title,
  //             description: description,
  //             steps: steps,
  //           } 
  //         }
  //       );
  
  //       res.status(200).send("Recipe updated successfully");
  //     } else {
  //       res.status(404).send("User not found");
  //     }
  //   } catch (error) {
  //     console.error("Error updating recipe:", error);
  //     res.status(500).send("Error updating recipe");
  //   }
  // });
  



  app.post('/deleterecipe', async (req, res) => {
    try {
      const { _id } = req.body; 
  
        // Delete the recipe with the specified _id
        const deleteResult = await Recipe.deleteOne({ _id });
  
        if (deleteResult.deletedCount > 0) {
          res.status(200).send("Recipe deleted successfully");
        } else {
          res.status(404).send("Recipe not found");
        }
    
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).send("Error deleting recipe");
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
   
  

      //const user = await User.findOne({ username });



      const filter = { user: username };
        
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);


        console.log(listings);
        
        const transformedListings = listings.map((listing, index) => {
          return {
            title: listing.title,
            user: listing.user, // Include the user field in the response
            description: listing.description,
            date: listing.date,
            _id: listing._id,
            id: index,
            photo: listing.photo,
          };
        });
     

      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Recipes:', error);
      res.status(500).send('Error fetching Recipes');
    }

  });



  app.post('/getBreakfastRecipes', async (req, res) => {

    try {
    
      const { username } = req.body;
      
      const users = await User.findOne({ username });
     // const filter = { user };
     const filter = { user:username, breakfast: true };  
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);
    
        
        const transformedListings = listings.map((listing, index) => {
          return {
            title: listing.title,
            user: listing.user, // Include the user field in the response
            description: listing.description,
            date: listing.date,
            _id: listing._id,
            id: index,
            photo: listing.photo,
          };
        });
     

      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Recipes:', error);
      res.status(500).send('Error fetching Recipes');
    }

  });



  app.post('/getLunchRecipes', async (req, res) => {

    try {
    
      const { username } = req.body;
      
      //const user = await User.findOne({ username });
     // const filter = { user };
     const filter = { user:username , lunch: true };  
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);
        
        const transformedListings = listings.map((listing, index) => {
          return {
            title: listing.title,
            user: listing.user, // Include the user field in the response
            description: listing.description,
            date: listing.date,
            _id: listing._id,
            id: index,
            photo: listing.photo,
          };
        });
     

      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Recipes:', error);
      res.status(500).send('Error fetching Recipes');
    }

  });




  app.post('/getDinnerRecipes', async (req, res) => {

    try {
    
      const { username } = req.body;
      
      //const user = await User.findOne({ username });
     // const filter = { user };
     const filter = { user:username , dinner: true };  
        // Fetch listings matching the filter
        const listings = await Recipe.find(filter);
        
        const transformedListings = listings.map((listing, index) => {
          return {
            title: listing.title,
            user: listing.user, // Include the user field in the response
            description: listing.description,
            date: listing.date,
            _id: listing._id,
            id: index,
            photo: listing.photo,
          };
        });
     

      res.json(transformedListings);
   
    } catch (error) {
      console.error('Error fetching Recipes:', error);
      res.status(500).send('Error fetching Recipes');
    }

  });


  app.post('/getSearchRecipes', async (req, res) => {

    try {
    
      const { username, title } = req.body;
     // const user = await User.findOne({ username });
    // Use a regex for partial and case-insensitive matching of the title
    const filter = {
      user:username,
      title: { $regex: title, $options: 'i' } // 'i' for case-insensitive matching
    };
        
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






  // app.post('/getCertainRecipe', async (req, res) => {

  //   try {
    
  //     const { _id } = req.body;
  //     const filter = { _id };
        
  //       // Fetch listings matching the filter
  //       const listings = await Recipe.find(filter);
  //       //console.log(listings);
        
  //       const transformedListings = listings.map((listing) => {
  //         return {
  //           title: listing.title,
  //           user: listing.user, // Include the user field in the response
  //           description: listing.description,
  //           date: listing.date,
  //           _id: listing._id,
  //           steps: listing.steps,
  //         };
  //       });
     

  //     res.json(transformedListings);
   
  //   } catch (error) {
  //     console.error('Error fetching Recipes:', error);
  //     res.status(500).send('Error fetching Recipes');
  //   }

  // });



  app.post('/getCertainRecipe', async (req, res) => {
    try {
      const { _id } = req.body;
      const filter = { _id };
  
      // Fetch listings matching the filter
      const listings = await Recipe.find(filter);
  
      const transformedListings = listings.map((listing) => {
        const transformedListing = {
          title: listing.title,
          user: listing.user, // Include the user field in the response
          description: listing.description,
          date: listing.date,
          _id: listing._id,
          steps: listing.steps,
          breakfast: listing.breakfast, 
          lunch: listing.lunch,
          dinner: listing.dinner,
        };
  
        // Include photo if it exists
        if (listing.photo && listing.photo.data) {
          transformedListing.photo = {
            data: listing.photo.data.toString('base64'), // Convert Buffer to Base64
            contentType: listing.photo.contentType,
          };
        }
  
        return transformedListing;
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
        
        const transformedListings = listings.map((listing, index) => {
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







    // ✅ all your recipe routes here (addrecipe, editrecipe, deleterecipe, getRecipes, etc.)
    // ... (copy unchanged from your original code)

    // Start server AFTER DB + session ready
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

module.exports = app;


