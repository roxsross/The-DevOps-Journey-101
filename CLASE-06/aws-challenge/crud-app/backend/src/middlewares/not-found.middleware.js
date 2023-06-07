const httpStatusCodes = require('http-status-codes');

module.exports = (req, res) => {
    res.status(httpStatusCodes.NOT_FOUND).send(
        {
            status: httpStatusCodes.NOT_FOUND,
            message: 'Path not found'
        });
}