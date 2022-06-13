/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const Ryokan = require("../models/ryokan");
const Review = require("../models/review");
const express = require("express"); // import express

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.get("/", async (req, res) => {
  // find all the ryokans
  try {
    const ryokans = await Ryokan.find();
    console.log(ryokans);
    res.render("ryokans/index.liquid", { ryokans });
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
});

// show ryokan page
router.get("/:id", async (req, res) => {
  Ryokan.findById(req.params.id)
    .populate("reviews")
    .exec(function (err, ryokan) {
      console.log(ryokan.reviews);
      res.render("ryokans/show.liquid", {
        ryokan,
        reviews: ryokan.reviews,
      });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
