// const mongoose = require('mongoose');
// const { User } = require('../models/Users'); 
// const fs = require('fs'); // Import fs to handle file operations
// const path = require('path'); // Import path for file paths
// const bcrypt = require('bcrypt');
// saltRounds = 8;

// //npm run seedUsers



// //npm run seedRecipes

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe_project')
//   .then(() => {
//     console.log('✅ Connected to MongoDB for seeding recipes');
//   })
//   .catch((error) => {
//     console.error('❌ Connection error:', error);
//     process.exit(1); // Exit process with failure
//   });



//   const users = [

//     {
//         username: 'testaccount',
//         password: 'Coolpassword15',
//         email: 'testaccount@example.com',
//       },

//   ];




//   // Seed Function
// const seedUsers = async () => {
//     try {
//         await User.deleteMany({});
//         console.log('🗑️ Existing users cleared.');
    
//         for (const user of users) {
//           const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
//           const userData = {
//             username: user.username,
//             email: user.email,
//             password: hashedPassword,
//           };
    
//           const createdUser = new User(userData);
//           await createdUser.save();
//           console.log('✅ User created successfully:', createdUser.username);
//         }
//       } catch (error) {
//         console.error('❌ Error seeding users:', error);
//       } finally {
//         mongoose.connection.close();
//         console.log('🔌 MongoDB connection closed.');
//       }


    
//   };
  
//   // Run the seed function
//   seedUsers();


const mongoose = require('mongoose');
const { User } = require('../models/Users'); 
const bcrypt = require('bcrypt');
require('dotenv').config(); // ✅ Load env vars

const saltRounds = 8;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/recipe_project')
  .then(() => {
    console.log('✅ Connected to MongoDB for seeding users');
  })
  .catch((error) => {
    console.error('❌ Connection error:', error);
    process.exit(1);
  });

const users = [
  {
    username: 'testaccount',
    password: 'Coolpassword15',
    email: 'testaccount@example.com',
  },
];

// Seed Function
const seedUsers = async () => {
  try {
    await User.deleteMany({});
    console.log('🗑️ Existing users cleared.');

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const userData = {
        username: user.username,
        email: user.email,
        password: hashedPassword,
      };

      const createdUser = new User(userData);
      await createdUser.save();
      console.log('✅ User created successfully:', createdUser.username);
    }
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
};

// Run the seed function
seedUsers();
