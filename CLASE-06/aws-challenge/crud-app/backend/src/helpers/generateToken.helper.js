const { JWT_SECRET } = require("./../config");
const jwt = require('jsonwebtoken');

const generateToken = async (user) => {

    const payload = { user };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, {
            expiresIn: 360000
        }, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });

    });

}

module.exports = generateToken;