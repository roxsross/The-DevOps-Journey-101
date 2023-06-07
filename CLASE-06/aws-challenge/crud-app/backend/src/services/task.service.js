
const taskRepository = require('../repositories/task.repository');
const validateId = require('../helpers/moongoseTypesId.helper');

const service = {

    getAllTask: async (skip, limit, query) => {
        const result = await taskRepository.getAllTask(skip, limit, query);
        return result;
    },
    getOneTask: async (id) => {
        const task = await getOneTaskValidate(id);
        await validateOwnerTask(task.owner, userId);
        return task;
    },
    createTask: async (task) => {
        const createdTask = await taskRepository.createTask(task);
        return createdTask;
    },
    updateTask: async (task, id) => {
        // const findedTask = await getOneTaskValidate(id);
        const updatedTask = await taskRepository.updateTask(task, id);
        return updatedTask;
    },
    deletedTask: async (id) => {
        // const findedTask = await getOneTaskValidate(id);
        const deletedTask = await taskRepository.deletedTask(id);
        return deletedTask;
    }

}

const getOneTaskValidate = async (id) => {
    if (!validateId(id)) throw new Error('The task does not exist');
    const taskExist = await taskRepository.getOneTask(id);
    if (!taskExist) throw new Error('The task does not exist');
    return taskExist;
}

const validateOwnerTask = async (id, userId) => {

    if (id != userId) {
        throw new Error('User not authorized');
    }

}

module.exports = service;