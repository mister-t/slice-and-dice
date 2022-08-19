import { ERR_MSG_UNKNOWN_ROUTE } from '../constants/errorMessages.js';

const urlNotFound = (req, res, next) => {
  const error = new Error(`${ERR_MSG_UNKNOWN_ROUTE} - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { message, stack } = err;
  const { statusCode } = res;

  //sometimes you can still have errors (such as those of servers) when status code is 200
  const code = statusCode === 200 ? 500 : statusCode;
  res.status(code);
  res.json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : stack,
  });
};

export { urlNotFound, errorHandler };
