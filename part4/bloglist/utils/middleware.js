// Desc: Middleware functions for request logging, error handling, and unknown endpoint handling
const logger = require('./logger');

// Middleware function for logging requests
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

// Middleware function for handling unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Middleware function for error handling
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// Export the middleware functions
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
};
