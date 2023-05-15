import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer)
            const cleared = {
                name: '',
            };
            this.setState(cleared);
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a manufacturer</h1>
                <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleChange} placeholder="Manufacturer" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Manufacturer Name</label>
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
export default ManufacturerForm
