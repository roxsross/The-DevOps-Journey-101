const responseResult = {
  general(res, status, results, message = undefined) {
    res.status(status).json({
      status,
      message,
      results
    });
  },
  error(res, status, message, stack = undefined) {
    const response = { status, message };
    (stack) ? response.stack = stack : null;
    res.status(status).json(response);
  },
};

module.exports = responseResult;
