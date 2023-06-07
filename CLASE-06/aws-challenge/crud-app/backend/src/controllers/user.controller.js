const { validationResult } = require('express-validator');
const httpStatusCodes = require('http-status-codes');
const responseResult = require('../helpers/response.helper');
const userService = require('./../services/user.service');
const generateToken = require('../helpers/generateToken.helper');

const controller = {

    createUser: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Validation Error', errors);
            }
            let user = await userService.createUser(req.body);
            let token = await generateToken(user);
            const response = { user, token };
            return responseResult.general(res, httpStatusCodes.CREATED, response, 'User Crated')
        } catch (error) {
            if (error.message == 'Email is already in use.') {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, error.message, error);
            }
            return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, error.message, error);
        }
    }

}

module.exports = controller;