const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"], // Only allow 'Point' for now
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  images: [String], // Array to store paths to images
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
