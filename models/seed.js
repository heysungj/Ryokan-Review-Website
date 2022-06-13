/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const Ryokan = require("./ryokan");
const Review = require("./review");
const User = require("./user");
const mongoose = require("./connection");
const { ryokans, reviews, initialUser } = require("./seedData");

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
  await Ryokan.create(ryokans).then((ryokans) => {
    // log the new fruits to confirm their creation
    console.log(ryokans);
  });

  await Review.create(reviews).then((reviews) => {
    // log the new fruits to confirm their creation
    console.log(reviews);
  });

  await User.create(initialUser).then((initialUser) => {
    // log the new fruits to confirm their creation
    console.log(initialUser);
  });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});
