const express = require("express");
const movieContollers = require("../controllers/movies.controller");
const router = express.Router();

router.get("/list", movieContollers.getAllMoviesController);
router.get("/search/:title", movieContollers.getSingleMovieController);
router.post("/create", movieContollers.createNewMovieController);
router.delete("/delete/:id", movieContollers.deleteMovieController);

module.exports = {
  movieRouter: router,
};
