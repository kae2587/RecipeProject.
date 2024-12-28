const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require( 'bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const multer = require("multer");
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

const { User } = require('./models/Users'); 
const { Recipe } = require('./models/Recipes'); 

const app = express();

app.use(express.static(path.join(__dirname, '../Frontend/public'))); // any file within the Frontend directory will be handled here
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


  app.post("/addrecipe", upload.single("photo"), async (req, res) => {
    try {
      const { title, description , username} = req.body;
      const steps = req.body.steps ? [].concat(req.body.steps) : [];
      const user = await User.findOne({ username });
      if(user){
      const recipe = new Recipe({
        title,
        description,
        steps,
        user,
        photo: req.file
          ? {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            }
          : undefined,
      });
      await recipe.save();
      res.json({ message: "Recipe created successfully" });
    }

      
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating recipe');
    }
  });



  // app.post("/editrecipe", async (req, res) => {
  //   upload.single("photo")(req, res, async (err) => {
  //     if (err instanceof multer.MulterError) {
  //       // Handle Multer-specific errors
  //       console.error("Multer error:", err);
  //       return res.status(400).send("File upload error");
  //     } else if (err) {
  //       // Handle generic errors
  //       console.error("Unknown error:", err);
  //       return res.status(500).send("Error processing uploaded file");
  //     }
  
  //     try {
  //       const { title, description, username, _id } = req.body;
  
  //       // Ensure steps are properly handled
  //       const steps = Array.isArray(req.body.steps) ? req.body.steps : [req.body.steps];
  
  //       const user = await User.findOne({ username });
  
  //       if (user) {
  //         const updateFields = {
  //           title,
  //           description,
  //           steps,
  //         };
  
  //         // Safely check for file upload
  //         if (req.file) {
  //           updateFields.photo = {
  //             data: req.file.buffer,
  //             contentType: req.file.mimetype,
  //           };
  //         }
  
  //         const updateResult = await Recipe.updateOne({ _id }, { $set: updateFields });
  
  //         if (updateResult.modifiedCount > 0) {
  //           return res.json({ message: "Recipe updated successfully" });
  //         } else {
  //           return res.status(404).send("Recipe not found or no changes made");
  //         }
  //       } else {
  //         return res.status(404).send("User not found");
  //       }
  //     } catch (error) {
  //       console.error("Error updating recipe:", error);
  //       return res.status(500).send("Error updating recipe");
  //     }
  //   });
  // });
  
  
  




  app.post('/editrecipe', async (req, res) => {
    try {
      const { title, description, username, steps, _id } = req.body;

      const user = await User.findOne({ username });
  
      if (user) {
        const updateResult = await Recipe.updateOne(
          { _id },
          { 
            $set: { 
              title: title,
              description: description,
              steps: steps,
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
      const user = await User.findOne({ username });
    // Use a regex for partial and case-insensitive matching of the title
    const filter = {
      user,
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







  // Start the server
const PORT = process.env.PORT || 8001; // Use environment variable or default to 8001
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});


module.exports = app;



