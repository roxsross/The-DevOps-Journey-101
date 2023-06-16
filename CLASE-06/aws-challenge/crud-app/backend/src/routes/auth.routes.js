const express = require('express');
const router = express.Router();
const controller = require('./../controllers/auth.controller');
const validate = require('../validators/auth.validate');

router.post('/', validate.authUser, controller.signIn);

module.exports = router;