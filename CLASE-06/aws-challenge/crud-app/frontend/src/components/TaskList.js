import React, { useEffect, useState } from 'react'
import Task from './Task'
import clienteAxios from '../config/axios';

const TaskList = ({ tasks, handleTaskDelete, handleSetingUpdate }) => {



    return (
        <div>
            {
                tasks?.length > 0 ? tasks.map(task =>
                    <Task key={task.id} task={task} handleTaskDelete={handleTaskDelete} handleSetingUpdate={handleSetingUpdate} />)
                    : <p>No hay Tareas</p>
            }
        </div>
    )
}

export default TaskList
