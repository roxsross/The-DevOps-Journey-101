const express = require('express');
const router = express.Router();
const controller = require('./../controllers/task.controller');
const validate = require('../validators/task.validate');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.getAllTasks);
router.post('/', validate.createTask, controller.createTask);
router.get('/:id', controller.getOneTask);
router.put('/:id', validate.updatedTask, controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;