// ////////////////////////////////////////
// // Import Dependencies
// ////////////////////////////////////////
// const express = require("express");
// const Review = require("../models/review");

// /////////////////////////////////////////
// // Create Route
// /////////////////////////////////////////
// const router = express.Router();

// /////////////////////////////////////////
// // Routes
// /////////////////////////////////////////
// router.use((req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect("/user/login");
//   }
// });

// // The Signup Routes (Get => form, post => submit form)
// router.get("/new", (req, res) => {
//   res.render("reviews/new.liquid", {
//     username: req.session.username,
//     userId: req.session.userId,
//     ryokanId: req.query.ryokanId,
//     ryokanName: req.query.ryokanName,
//   });
// });

// router.post("/new", (req, res) => {
//   Review.create(req.body)
//     .then((review) => {
//       // redirect user to index page if successfully created item
//       res.redirect("/ryokans/:ryokanId");
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

// //////////////////////////////////////////
// // Export the Router
// //////////////////////////////////////////
// module.exports = router;
