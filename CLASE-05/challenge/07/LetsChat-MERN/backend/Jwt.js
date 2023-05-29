const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path:"config.env"})

const generatetoken = (user_id) => {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    return token;
}

module.exports = generatetoken;