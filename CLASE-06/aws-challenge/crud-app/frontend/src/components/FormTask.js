import React, { useState } from 'react'
import clienteAxios from '../config/axios';

const FormTask = ({ getAllTasks, form, setForm, updating, setUpdating }) => {


    const [created, setCreated] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [error, setError] = useState(false)


    const { name, description } = form;


    const handleChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (name === '' || description === '') {
            setError(true);
            return;
        }
        const resultado = await clienteAxios.post('/api/tasks/', form);
        setForm({
            id: '',
            name: '',
            description: ''
        })

        setError(false);
        setCreated(true);
        setTimeout(() => {
            setCreated(false);
        }, 2500);
        getAllTasks();
    }

    const handleCancelUpdate = () => {
        setForm({
            id: '',
            name: '',
            description: ''
        });
        setUpdating(false);
    }

    const handleUpdateTask = async () => {
        const resultado = await clienteAxios.put(`/api/tasks/${form.id}`, form);
        setUpdated(true);
        setTimeout(() => {
            setUpdated(false);
        }, 2500);
        getAllTasks();
    }

    return (
        <>
            <form className="row" >
                <div className="col-12 d-flex">
                    <label htmlFor="" className="form-control m-2">Nombre:</label>
                    <input type="text" name="name" value={name} className="form-control m-2" required={true} onChange={handleChangeForm} />
                </div>
                <div className="col-12 d-flex">
                    <label htmlFor="" className="form-control m-2">Descripción:</label>
                    <textarea type="text" name="description" value={description} className="form-control m-2" required={true} onChange={handleChangeForm} />
                </div>
                {
                    updating ? <div className="col-12">
                        <button type="button" className="btn btn-secondary m-2 " onClick={handleUpdateTask}>Update Task</button>
                        <button type="button" className="btn btn-danger m-2 " onClick={handleCancelUpdate}>Cancel</button>
                    </div> : <div className="col-12">
                            <button type="button" className="btn btn-primary m-2 b-block" onClick={handleSubmitForm}>Create Task</button>
                        </div>
                }
                {error ? <div class="alert alert-danger ml-4 mt-4" role="alert">
                    Por favor rellene los campos !
                </div> : null
                }
                {
                    created ? <div class="alert alert-primary ml-4 mt-4" role="alert">
                        Task created succesfully
                </div> : null
                }
                {
                    updated ? <div class="alert alert-success ml-4 mt-4" role="alert">
                        Task updated succesfully
                </div> : null
                }
            </form>
        </>
    )
}

export default FormTask
