/**
 * @description
 * The server could not understand
 * the request due to invalid syntax.
 */
class BadRequestError extends Error {
  constructor (message, description) {
    super(message);
    this.name = "BadRequestError";
    this.description = description;
    this.statusCode = 400;
  }
}


class NotFoundError extends Error {
  constructor (message, description) {
    super(message);
    this.name = "NotFoundError";
    this.description = description;
    this.statusCode = 404;
  }
}


/**
 * @description
 * The server has encountered a situation
 * it doesn't know how to handle.
 */
class InternalServerError extends Error {
  constructor (message, description) {
    super(message);
    this.name = "InternalServerError";
    this.description = description;
    this.statusCode = 500;
  }
}


/**
 * @description
 * This response is sent when a request conflicts
 * with the current state of the server.
 */
class ConflictError extends Error {
  constructor (message, description) {
    super(message);
    this.name = "ConflictError";
    this.description = description;
    this.statusCode = 409;
  }
}


/**
 * @description
 * The client must authenticate itself
 * to get the requested response.
 */
class UnauthorizedError extends Error {
  constructor (message, description) {
    super(message);
    this.name = 'UnauthorizedError';
    this.description = description;
    this.statusCode = 401;
  }
}


module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ConflictError,
  UnauthorizedError
}