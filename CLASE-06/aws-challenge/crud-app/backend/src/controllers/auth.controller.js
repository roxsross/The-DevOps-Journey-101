const { validationResult } = require('express-validator');
const responseResult = require('../helpers/response.helper');
const httpStatusCodes = require('http-status-codes');
const authService = require('./../services/auth.service');
const generateToken = require('../helpers/generateToken.helper');

const controller = {

    signIn: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Validation Error', errors);
            }
            let user = await authService.getOneUserByEmail(req.body);
            let token = await generateToken(user);
            const response = { user, token };
            return responseResult.general(res, httpStatusCodes.OK, response, 'Auth successfully.')
        } catch (error) {
            console.log(error)
            if (error.message == 'User does not exist.') {
                return responseResult.error(res, httpStatusCodes.NOT_FOUND, error.message, error);
            }
            if (error.message == 'Wrong password.') {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, error.message, error);
            }
            responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, error.message, error);
        }
    }

}

module.exports = controller;