const Joi = require("joi");
const JoiMongoId = require("joi-objectid");
Joi.objectId = JoiMongoId(Joi);

const MongoIdValidator = Joi.object({
  id: Joi.objectId(),
}).strict();

module.exports = MongoIdValidator;
