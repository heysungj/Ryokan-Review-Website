/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const Ryokan = require("../models/ryokan");
const Review = require("../models/review");
const User = require("../models/user");
const express = require("express"); // import express

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

router.get("/", async (req, res) => {
  // find all the ryokans
  try {
    const ryokans = await Ryokan.find();
    console.log(ryokans);
    console.log(req.session);
    res.render("ryokans/index.liquid", {
      ryokans,
      login: req.session.loggedIn,
    });
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
});

// show ryokan page
router.get("/:id", async (req, res) => {
  Ryokan.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .exec(function (err, ryokan) {
      console.log(ryokan.reviews);
      res.render("ryokans/show.liquid", {
        login: req.session.loggedIn,
        ryokan,
        reviews: ryokan.reviews,
        username: req.session.username,
        userId: req.session.userId,
        id: req.params.id,
      });
    });
});

router.post("/:id/reviews/new", async (req, res) => {
  const id = req.params.id;
  try {
    const newReview = await Review.create(req.body);
    await Ryokan.findOneAndUpdate(
      { _id: id },
      {
        $push: { reviews: newReview._id },
      }
    );

    console.log(newReview);
    // redirect user to index page if successfully created item
    res.redirect(`/ryokans/${id}`);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
