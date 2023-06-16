import React from 'react'

const Task = ({ task, handleTaskDelete, handleSetingUpdate }) => {
    return (
        <div className="card m-2">
            <div className="card-body d-flex justify-content-between">
                <div>
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-text">{task.description}</p>
                </div>
                <div >
                    <a href="#" className="btn btn-secondary mr-2" onClick={() => handleSetingUpdate(task)}>Update</a>
                    <a href="#" className="btn btn-danger" onClick={() => handleTaskDelete(task.id)}>Delete</a>
                </div>

                
            </div>
        </div>
    )
}

export default Task
