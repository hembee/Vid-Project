const Joi = require("joi");
const JoiMongoId = require("joi-objectid");

Joi.objectId = JoiMongoId(Joi);

const createMovieValidator = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
}).strict();
const updateMovieValidator = Joi.object({
  title: Joi.string().optional(),
  genre: Joi.string().required(),
}).strict();

module.exports = {
  createMovieValidator: createMovieValidator,
  updateMovieValidator: updateMovieValidator,
};
