const Joi = require("joi");

const createMovieValidator = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  genre: Joi.string().required(),
}).strict();

module.exports = createMovieValidator;
