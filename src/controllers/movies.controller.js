// const Movie = require("../models/movies.model")

// array to store the movies
let movies = [
  { id: 1, title: "Rambo", genre: "Action" },
  { id: 2, title: "Die Hart", genre: "Comedy" },
  { id: 3, title: "Tetris", genre: "Drama" },
  { id: 4, title: "Purple Heart", genre: "Romance" },
  { id: 5, title: "Emancipation", genre: "History" },
];

const movieContollers = {
  // GET ALL THE MOVIES
  getAllMoviesController: (req, res) => {
    res.status(200).json({
      status: "Successful",
      message: "Movies found",
      data: { movies },
    });
  },
  // GET A SINGLE MOVIE
  getSingleMovieController: (req, res) => {
    const movie = movies.find(
      (mov) => mov.title.toLowerCase() === req.params.title
    );
    if (!movie)
      return res.status(404).json({
        status: "failed",
        message: "Please pass in a Movie title",
      });
    return res.status(200).json({
      status: "success",
      message: "Movie found",
      data: { movie },
    });
  },
  // CREATE A MOVIE
  createNewMovieController: (req, res) => {
    //  const newMovie = Movie.create(req.body);
    //  res.status(201).json({
    //    message: "Movie added succesfully",
    //    status: "Success",
    //    data: { movie: newMovie },
    //  });
    const movie = {
      id: movies.length + 1,
      title: req.body.title,
      genre: req.body.genre,
    };
    movies.push(movie);
    res.status(201).json({
      Status: "Success",
      message: "Movie created",
      data: { createdMovie: movie },
    });
  },
  // DELETE A MOVIE
  deleteMovieController: (req, res) => {
    const movie = movies.find((mov) => mov.id === parseInt(req.params.id));
    if (!movie)
      return res
        .status(404)
        .send("The movie with the given ID was not found .");
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.status(200).json({
      Status: "Success",
      message: "Movie deleted",
      data: { deletedMovie: movie },
    });
  },
};

module.exports = movieContollers;
