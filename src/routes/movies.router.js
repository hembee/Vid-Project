const express = require("express");
const movieContollers = require("../controllers/movies.controller");
const tryCatchHandler = require("../utils/tryCatch.handler");
const userAuthMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get(
  "/list",
  userAuthMiddleware,
  tryCatchHandler(movieContollers.getAllMoviesController)
);
router.get(
  "/search/:title",
  userAuthMiddleware,
  tryCatchHandler(movieContollers.getSingleMovieController)
);
router.post(
  "/create",
  userAuthMiddleware,
  tryCatchHandler(movieContollers.createNewMovieController)
);
router.delete(
  "/delete/:id",
  userAuthMiddleware,
  tryCatchHandler(movieContollers.deleteMovieController)
);

module.exports = {
  movieRouter: router,
};
