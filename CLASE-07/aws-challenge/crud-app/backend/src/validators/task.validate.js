const { check } = require('express-validator');

const validate = {

    createTask: [
        check('name', 'the name is required').not().isEmpty(),
        check('description', 'the description is required').not().isEmpty()

    ],

    updatedTask: [
        check('name', 'the name is required').not().isEmpty(),
        check('description', 'the description is required').not().isEmpty()
    ]
}

module.exports = validate;