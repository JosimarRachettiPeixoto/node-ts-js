import { ErrorCode } from './error-code.js';

export class ErrorException extends Error {
  status = null;
  metaData = null;
  constructor(code = ErrorCode.UnknownError, message="something wrong", metaData = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.message = message;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.Unauthenticated:
        this.status = 401;
        break;
      case ErrorCode.BadRequest:
        this.status = 400;
        break;
      case ErrorCode.AsyncError:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      case ErrorCode.Conflict:
        this.status = 409;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
