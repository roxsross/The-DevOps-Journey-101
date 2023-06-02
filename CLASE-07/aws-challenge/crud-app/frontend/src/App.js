import React, { useState, useEffect } from 'react';
import FormTask from './components/FormTask';
import TaskList from './components/TaskList';
import clienteAxios from './config/axios';


function App() {

  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false)

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: ''
  })

  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    getAllTasks();
  }, [])

  const getAllTasks = async () => {
    const res = await clienteAxios.get('/api/tasks/');
    setTasks(res.data.results);
    setLoading(false);
  }


  const handleSetingUpdate = (task) => {
    setForm(task);
    setUpdating(true);
  }

  const handleTaskDelete = async (id) => {
    const result = await clienteAxios.delete(`/api/tasks/${id}`);
    getAllTasks();
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 1500);
    setForm({
      id: '',
      name: '',
      description: ''
    })
    setUpdating(false);
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="title">Tasks</h1>
          <h2 className="subtitle">Form Task</h2>
        </div>
        <div className="col-6">
          <FormTask getAllTasks={getAllTasks} form={form} setForm={setForm} updating={updating} setUpdating={setUpdating} />
          {
            deleted ? <div class="alert alert-danger ml-4 mt-4" role="alert">
              Task deleted succesfully
                </div> : null
          }
        </div>
        <div className="col-6">
          {
            loading ? <p>Cargando...</p> :
              <TaskList tasks={tasks} handleTaskDelete={handleTaskDelete} handleSetingUpdate={handleSetingUpdate} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
