////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Review = require("../models/review");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const reviewId = req.params.id;
  // get the fruit from the database
  Review.findById(reviewId)
    .populate("ryokan")
    .populate("user")
    .exec(function (err, review) {
      console.log(review.ryokan);
      // render edit page and send review data
      res.render("reviews/edit.liquid", {
        login: req.session.loggedIn,
        review,
        ryokan: review.ryokan,
        user: review.user,
      });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the review
  Review.findByIdAndUpdate(id, req.body, { new: true })
    .then((review) => {
      // redirect to main page after updating
      res.redirect(`/ryokans/${review.ryokan}`);
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Review.findByIdAndRemove(id)
    .then((review) => {
      // redirect to main page after deleting
      res.redirect(`/ryokans/${review.ryokan}`);
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
