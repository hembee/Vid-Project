const User = require("../models/users.model");
const Movie = require("../models/movies.model");
const {
  createMovieValidator,
  updateMovieValidator,
} = require("../validators/movies.validator");
const mongoIdValidator = require("../validators/mongoId.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");

const movieContollers = {
  // GET ALL THE MOVIES
  getAllMoviesController: async (req, res) => {
    const id = req.user._id;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const user = await User.findById(id);
    if (!user)
      throw new NotFoundError(`The user with this id: ${id}, does not exist`);

    const movies = await Movie.find({ creatorId: id }).populate("creator");

    return res.status(200).json({
      message:
        movies.length < 1 ? "No movies found" : "Movies found successfully",
      status: "Success",
      data: {
        movies: movies,
      },
    });
  },
  // GET A SINGLE MOVIE
  getSingleMovieController: async (req, res) => {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const movie = await Movie.findById(id);
    if (!movie)
      throw new NotFoundError(`The movie with this id: ${id}, does not exist`);
    return res.status(200).json({
      status: "success",
      message: "Movie found",
      data: { movie },
    });
  },
  // CREATE A MOVIE
  createNewMovieController: (req, res) => {
    const { error, value } = createMovieValidator.validate(req.body);
    if (error) throw error;
    const newMovie = Movie.create({
      ...req.body,
      creator: req.user._id,
      creatorId: req.user._id,
    });
    res.status(201).json({
      message: "Movie added succesfully",
      status: "Success",
      data: { movie: newMovie },
    });
    // const movie = {
    //   id: movies.length + 1,
    //   title: req.body.title,
    //   genre: req.body.genre,
    // };
    // movies.push(movie);
    // res.status(201).json({
    //   Status: "Success",
    //   message: "Movie created",
    //   data: { createdMovie: movie },
    // });
  },
  // DELETE A MOVIE
  deleteMovieController: async (req, res) => {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const movie = await Movie.findById(id);
    if (!movie)
      throw new NotFoundError(`The movie with this id: ${id}, does not exist`);

    await Movie.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).json({
      Status: "Success",
      message: "Movie deleted",
      data: { deletedMovie: movie },
    });
  },
};

module.exports = movieContollers;
