const Joi = require('joi');

const joiCategorySchema = Joi.object({
  title: Joi.string().required(),
});

module.exports = joiCategorySchema;
