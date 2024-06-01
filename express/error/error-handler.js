
import { ErrorCode } from './error-code.js';
import { ErrorException } from './error-exception.js';

export const errorHandler = (err, req, res, next) => {
  console.log('Error handling middleware called.');
  console.error('Error occured:', err.message);
  if (err instanceof ErrorException) {
    console.log('Error is known.');
    next(res.status(err.status).send({message:err.message}));
  } else {
    next(res.status(500).send({ code: ErrorCode.UnknownError, status: 500 }));
  }

};
