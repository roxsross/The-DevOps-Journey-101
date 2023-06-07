const express = require('express');
const router = express.Router();
const controller = require('./../controllers/user.controller');
const validate = require('../validators/user.validate');

router.post('/', validate.createUser, controller.createUser);

module.exports = router;