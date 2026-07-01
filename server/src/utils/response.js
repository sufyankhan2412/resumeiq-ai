const sendSuccess = (res, data, message = 'Request completed successfully', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message, statusCode = 500, details = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
};

const sendPagination = (
  res,
  items,
  pagination,
  message = 'Request completed successfully',
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data: items,
    pagination,
  });
};

const sendValidationError = (res, errors, message = 'Validation failed', statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendPagination,
  sendValidationError,
};
