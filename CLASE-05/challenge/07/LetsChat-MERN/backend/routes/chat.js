const express = require('express');
const router = express.Router();

const { authenticated } = require('../middleware/authentication');
const {
    accesschat,
    fetchchats,
    creategroupchat,
    renamegroupchat,
    addtogroup,
    removefromgroup,
    exitgroup
} = require('../controllers/chatcontrollers');

router.route('/').post(authenticated, accesschat);
router.route('/').get(authenticated, fetchchats);
router.route('/group').post(authenticated, creategroupchat);
router.route('/rename').put(authenticated, renamegroupchat);
router.route('/groupadd').put(authenticated, addtogroup);
router.route('/group/remove').put(authenticated, removefromgroup);
router.route('/group/exit').put(authenticated, exitgroup);
module.exports = router;