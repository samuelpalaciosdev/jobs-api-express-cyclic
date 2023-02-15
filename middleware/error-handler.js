const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
    status: '',
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ status: err.status, msg: err.message });
  }

  // ! Duplicate error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }

  // status property based on statusCode
  customError.status = customError.statusCode.toString().startsWith('4') ? 'failed' : 'error';

  return res.status(customError.statusCode).json({ status: customError.status, msg: customError.msg });
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
