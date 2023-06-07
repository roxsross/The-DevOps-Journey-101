const { validationResult } = require('express-validator');
const taskService = require('./../services/task.service');
const responseResult = require('../helpers/response.helper');
const httpStatusCodes = require('http-status-codes');

const controller = {

    getAllTasks: async (req, res) => {
        try {
            const querySkip = Number(req.query.skip) || 0;
            const queryLimit = Number(req.query.limit) || 6;
            const query = req.query.search || '';
            const tasks = await taskService.getAllTask(querySkip, queryLimit, query);
            responseResult.general(res, httpStatusCodes.OK, tasks);
        } catch (error) {
            console.log(error)
            responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error');
        }
    },
    createTask: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Validation Error', errors);
            }
            const task = await taskService.createTask(req.body);
            responseResult.general(res, httpStatusCodes.CREATED, task);
        } catch (error) {
            console.log(error);
            responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
        }
    },

    getOneTask: async (req, res) => {
        try {
            const task = await taskService.getOneTask(req.params.id);
            responseResult.general(res, httpStatusCodes.OK, task)
        } catch (error) {
            console.log(error)
            return customError(res, error);
        }
    },

    updateTask: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Validation Error', errors);
            }
            const body = req.body;
            const id = req.params.id;
            const task = await taskService.updateTask(body, id);
            responseResult.general(res, httpStatusCodes.OK, task, 'Task Updated');
        } catch (error) {
            return customError(res, error);
        }
    },

    deleteTask: async (req, res) => {
        try {
            const id = req.params.id;
            const task = await taskService.deletedTask(id);
            return responseResult.general(res, httpStatusCodes.OK, task, 'Task Deleted');
        } catch (error) {
            console.log(error.message);
            return customError(res, error);
        }
    }


}

const customError = (res, error) => {
    if (error.message == 'The task does not exist') {
        return responseResult.error(res, httpStatusCodes.NOT_FOUND, error.message);
    }
    if (error.message == 'User not authorized') {
        return responseResult.error(res, httpStatusCodes.FORBIDDEN, error.message);
    }
    return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, error.message, error);

}


module.exports = controller;