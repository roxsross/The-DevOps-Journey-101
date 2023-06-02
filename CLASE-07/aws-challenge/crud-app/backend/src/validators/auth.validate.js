const { check } = require('express-validator');

const validate = {

    authUser: [
        check('email', 'the mail must be valid').isEmail(),
        check('password', 'the password is required').not().isEmpty(),
    ]
}

module.exports = validate;