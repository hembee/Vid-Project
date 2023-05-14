const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorId: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
