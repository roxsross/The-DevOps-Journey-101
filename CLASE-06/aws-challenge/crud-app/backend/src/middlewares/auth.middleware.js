const jwt = require('jsonwebtoken');
const responseResult = require('../helpers/response.helper');
const httpStatusCodes = require('http-status-codes');
const { JWT_SECRET } = require("./../config");

module.exports = (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        return responseResult.error(res, httpStatusCodes.UNAUTHORIZED, 'No token,invalid permission');
    }

    try {
        const auth = jwt.verify(token, JWT_SECRET);
        req.user = auth.user;
        next();
    } catch (err) {
        if (err.message = 'invalid token') {
            return responseResult.error(res, httpStatusCodes.UNAUTHORIZED, 'Invalid Token.');
        }
        responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, error.message, error);
    }

}