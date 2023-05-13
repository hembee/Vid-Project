const express = require("express");
const movieContollers = require("../controllers/movies.controller");
const tryCatchHandler = require("../utils/tryCatch.handler");
const router = express.Router();

router.get("/list", tryCatchHandler(movieContollers.getAllMoviesController));
router.get(
  "/search/:title",
  tryCatchHandler(movieContollers.getSingleMovieController)
);
router.post(
  "/create",
  tryCatchHandler(movieContollers.createNewMovieController)
);
router.delete(
  "/delete/:id",
  tryCatchHandler(movieContollers.deleteMovieController)
);

module.exports = {
  movieRouter: router,
};
