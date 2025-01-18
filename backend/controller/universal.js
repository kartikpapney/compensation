/**
 * Universal response handler for success and error.
 * @param {object} res - The Express response object.
 * @param {number} status - The HTTP status code to send.
 * @param {object} data - The data to include in the JSON response.
 */
function sendResponse(res, status, data) {
  res.status(status).json({
    status: status,
    success: status >= 200 && status < 300,
    data: data,
  });
}

/**
 * Controller to handle requests and catch errors.
 * @param {function} handler - The asynchronous function to execute for the route.
 * @returns {function} - Express middleware.
 */
function controller(handler) {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res);
      if (result !== undefined) {
        res.status(200).json({
          status: 200,
          success: true,
          data: result,
        });
      }
    } catch (error) {
      // Log the error (optional)
      console.error('Error caught in controller:', error);

      // Send error response
      sendResponse(res, error.status || 500, {
        message: error.message || 'Internal Server Error',
      });
    }
  };
}

module.exports = {
  controller,
};
