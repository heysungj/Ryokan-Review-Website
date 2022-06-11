/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const Ryokan = require("./ryokan");
const Review = require("./review");
const User = require("./user");
const mongoose = require("./connection");
const seedData = require("./seedData");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", async () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Delete all user and reviews and ryokans

  await User.deleteMany({});
  await Review.deleteMany({});

  await Ryokan.deleteMany({});

  // add the starter ryokans
  await Ryokan.create(seedData).then((seedData) => {
    // log the new fruits to confirm their creation
    console.log(seedData);
  });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});
