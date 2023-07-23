const ObjectId = require('mongoose').Types.ObjectId;
const { errorHandler } = require('../helpers/errors/errorHandler');

async function isValidObjId(req, res, next) {
  try {
    const { id } = req.params;

    const isIdValid = ObjectId.isValid(id);

    if (!isIdValid) {
      throw errorHandler('Id is not the ObjectId type', 415);
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isValidObjId };
