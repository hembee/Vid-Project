const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
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

module.exports = { Movie: movieSchema };
