const express = require('express');
const router = express.Router();

const { register, login, getallusers } = require('../controllers/authcontrollers');
const { authenticated } = require('../middleware/authentication');

router.route('/').get(authenticated, getallusers);
router.route('/signup').post(register);
router.route('/login').post(login);


module.exports = router;