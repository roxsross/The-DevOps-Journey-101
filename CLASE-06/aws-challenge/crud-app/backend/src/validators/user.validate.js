const { check } = require('express-validator');

const validate = {

    createUser: [
        check('user', 'the user is required').not().isEmpty(),
        check('email', 'the mail must be valid').isEmail(),
        check('password', 'The password must be a minimum of 6 characters').isLength({ min: 6 }),
    ]
}

module.exports = validate;