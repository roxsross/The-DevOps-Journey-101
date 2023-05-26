const jwt = require('jsonwebtoken');
const USER = require('../models/usermodel');
const asyncHandler = require('express-async-handler');

exports.authenticated = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const DecodedUser = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await USER.findById(DecodedUser.id).select("-password");
            next();
        } catch (error) {
            res.status(400).json({
                message: 'Unauthorised ! Login to get access.'
            })
        }
    }
});