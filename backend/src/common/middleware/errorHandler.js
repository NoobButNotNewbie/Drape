export function errorHandler(error, request, response, next) {
  if (response.headersSent) return next(error);

  const statusCode = error.statusCode || 500;
  response.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : error.message,
  });
}
