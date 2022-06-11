const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor
const model = mongoose.model; // shorthand for model function

// create a new Schema

const ryokanSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    img: [{ type: String, required: true }],
    tel: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ryokan", ryokanSchema);
