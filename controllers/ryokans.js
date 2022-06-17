/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const Ryokan = require("../models/ryokan");
const Review = require("../models/review");
const User = require("../models/user");
const express = require("express"); // import express
const multer = require("multer");
const AWS = require("aws-sdk"); //import AWS
const fs = require("fs/promises");

// Set the region
AWS.config.update({ region: "us-east-1" });
// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

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

// setup multer middleware to parse form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.session.userId + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage, limits: { fieldSize: 5000 } });

const readFile = async (file, urlArr) => {
  try {
    const fileResult = await fs.readFile("uploads/" + file);

    // Buffer Pattern; how to handle buffers; straw, intake/outtake analogy
    const base64data = new Buffer(fileResult, "binary");
    try {
      const result = await s3
        .upload({
          Bucket: "ryokan-photos",
          Key: file,
          Body: base64data,
        })
        .promise();
      console.log(`File upload to S3 successfully at ${result.Location}`);
      urlArr.push(result.Location);
    } catch (e) {
      console.log("Error uploading file to S3", err);
    }
  } catch (e) {
    console.log("Error reading temp files", e);
  }
};

const removeFile = async (file) => {
  await fs.rm("uploads/" + file);
};

// create new ryokan route
router.get("/new", (req, res) => {
  res.render("ryokans/new.liquid", {
    login: req.session.loggedIn,
    username: req.session.username,
  });
});

router.post("/new", upload.array("photos"), async (req, res) => {
  try {
    // reg ex to match
    const re = `${req.session.userId}`;
    const regex = new RegExp(re);
    const photoUrls = [];

    const allFiles = await fs.readdir("uploads/");

    const matches = allFiles.filter((filePath) => {
      return filePath.match(regex);
    });

    const numFiles = matches.length;
    if (numFiles) {
      // Read in the file, convert it to base64, store to S3
      for (i = 0; i < numFiles; i++) {
        await readFile(matches[i], photoUrls);
      }

      for (i = 0; i < numFiles; i++) {
        await removeFile(matches[i]);
      }
    }
    console.log(photoUrls);

    const newRyokan = new Ryokan(req.body);
    newRyokan.img = photoUrls;
    await newRyokan.save();

    // redirect user to index page if successfully created item
    res.redirect("/ryokans");
  } catch (error) {
    console.log("Error loading temp folder");
    res.json({ error });
  }
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

router.post("/:id/reviews/new", upload.array("photos"), async (req, res) => {
  const id = req.params.id;
  try {
    // reg ex to match
    const re = `${req.session.userId}`;
    const regex = new RegExp(re);
    const photoUrls = [];

    const allFiles = await fs.readdir("uploads/");

    const matches = allFiles.filter((filePath) => {
      return filePath.match(regex);
    });

    const numFiles = matches.length;
    if (numFiles) {
      // Read in the file, convert it to base64, store to S3
      for (i = 0; i < numFiles; i++) {
        await readFile(matches[i], photoUrls);
      }

      for (i = 0; i < numFiles; i++) {
        await removeFile(matches[i]);
      }
    }

    console.log(photoUrls);

    const newReview = new Review(req.body);
    newReview.photo = photoUrls;
    await newReview.save();
    console.log(newReview);

    await Ryokan.findOneAndUpdate(
      { _id: id },
      {
        $push: { reviews: newReview._id },
      }
    );

    // redirect user to index page if successfully created item
    res.redirect(`/ryokans/${id}`);
  } catch (error) {
    console.log("Error loading temp folder");
    res.json({ error });
  }
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
