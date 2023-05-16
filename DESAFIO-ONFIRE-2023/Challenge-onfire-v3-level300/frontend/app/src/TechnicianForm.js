import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employee_number: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newTech = await response.json();
            // console.log(newTech)
            const cleared = {
                name: '',
                employee_number: '',

            };
            this.setState(cleared);
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value })
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Technician</h1>
                <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
                <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleChange} placeholder="Technician Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Technician Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={this.state.employee_number} onChange={this.handleChange} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control" />
                    <label htmlFor="name">Employee Number</label>
                </div>
                <div className="mb-3">
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
        );
    }
}
export default TechnicianForm
