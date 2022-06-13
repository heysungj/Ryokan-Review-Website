////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("./models/connection");
const path = require("path");

const RyokanRouter = require("./controllers/ryokans");
// const ReviewRouter = require("./controllers/reviews");
// const UserRouter = require("./controllers/users");

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose

// const { Schema, model } = mongoose;

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static(path.join(__dirname, "public"))); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use("/ryokans", RyokanRouter); //send all '/ryokans' routs to ryokan.js
// app.use("/user", UserRouter); // send all "/user" routes to user router
// app.use("/reviews", ReviewRouter); // send all "/reviews" routes to review router

app.get("/", (req, res) => {
  res.send("hello world");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
