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
    res.redirect("/user/signup");
  }
});

router.get("/", async (req, res) => {
  // search bar result
  const { name } = req.query;
  if (name !== undefined) {
    const ryokanSearchData = await Ryokan.find({
      name: { $regex: name || "", $options: "i" },
    });

    // render results if have
    if (ryokanSearchData.length >= 0) {
      try {
        res.render("ryokans/index.liquid", {
          ryokans: ryokanSearchData,
          login: req.session.loggedIn,
          username: req.session.username,
        });
      } catch (e) {
        console.log(e);
        res.json({ error: e });
      }
    } else {
      // find all the ryokans
      try {
        const ryokans = await Ryokan.find();
        // console.log(ryokans);
        // console.log(req.session);
        res.render("ryokans/index.liquid", {
          ryokans,
          login: req.session.loggedIn,
          username: req.session.username,
        });
      } catch (e) {
        console.log(e);
        res.json({ error: e });
      }
    }
  } else {
    // find all the ryokans
    try {
      const ryokans = await Ryokan.find();
      // console.log(ryokans);
      // console.log(req.session);
      res.render("ryokans/index.liquid", {
        ryokans,
        login: req.session.loggedIn,
        username: req.session.username,
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  }
});

// create new ryokan route
router.get("/new", (req, res) => {
  res.render("ryokans/new.liquid", {});
});

router.post("/new", (req, res) => {
  Ryokan.create(req.body);
  res.redirect("/ryokans");
});

// show ryokan page
router.get("/:id", async (req, res) => {
  const ryokan = await Ryokan.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      model: "User",
    },
  });
  const singleReview = await Review.find({
    ryokan: req.params.id,
    user: req.session.userId,
  });
  console.log(singleReview);
  res.render("ryokans/show.liquid", {
    login: req.session.loggedIn,
    ryokan,
    reviews: ryokan.reviews,
    username: req.session.username,
    userId: req.session.userId,
    id: req.params.id,
    show: singleReview.length === 0 ? true : false,
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

    // console.log(newReview);
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
