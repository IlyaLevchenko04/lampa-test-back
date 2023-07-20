const Joi = require('joi');

const joiProductSchema = Joi.object({
  price: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  mainPhoto: Joi.string().required(),
  photos: Joi.array().items(Joi.string()).required(),
  currency: Joi.string().required(),
  categoryId: Joi.any(),
});

module.exports = joiProductSchema;
