const Task = require("./../models/task.model");
const pool = require("./../services/database.mysql.service");

const repository = {

    getAllTask: async (skip, limit, query) => {
        const result = await pool.query('SELECT * FROM tasks');
        return result;
    },

    getOneTask: async (id) => {
        const taskExist = await Task.findById(id);
        return taskExist;
    },

    createTask: async (task) => {
        const result = await pool.query(`INSERT INTO tasks(name,description) VALUES('${task.name}','${task.description}')`);
        return true;
    },

    updateTask: async (task, id) => {
        const result = await pool.query(`UPDATE tasks SET name='${task.name}',description='${task.description}' WHERE id='${id}'`);
        return true;
    },

    deletedTask: async (id) => {
        const result = await pool.query(`DELETE FROM tasks WHERE id='${id}'`);
        return true;
    }



}


module.exports = repository;