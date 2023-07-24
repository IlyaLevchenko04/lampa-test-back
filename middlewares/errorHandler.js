const ERRORS = require('../helpers/errors/errors');
const CustomError = require('../helpers/errors/customError');
const jwt = require('jsonwebtoken');

const errorHandler = (error, req, res, next) => {
  try {
    if (error instanceof CustomError) {
      const { id, message, code } = ERRORS[error.message](error.params);

      return res.status(code || 400).send({
        error: {
          id,
          message,
        },
        data: null,
      });
    }

    if (error.type === 'entity.parse.failed') {
      return res.status(error.statusCode).send({
        error: {
          id: 'INVALID_JSON',
          message: error.message,
        },
        data: null,
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        success: false,
        errors: ERRORS.TOKEN_EXPIRED(),
        data: null,
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        success: false,
        errors: ERRORS.INVALID_TOKEN(),
        data: null,
      });
    }

    return res.status(500).send({
      error: ERRORS.SERVER_ERROR(error),
      data: null,
    });
  } catch (error) {
    return res.status(500).send({
      error: ERRORS.SERVER_ERROR(error),
      data: null,
    });
  }
};

module.exports = { errorHandler };
