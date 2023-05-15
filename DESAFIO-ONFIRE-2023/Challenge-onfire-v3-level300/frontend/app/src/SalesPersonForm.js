import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          employee_id: '',

        }
        //when using this method below, make sure the variable matches the data's key
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ [event.target.name]: value }) //sets state name : value you typed
    }

      async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8090/api/salesreps/';
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newEmployee= await response.json();
            // console.log(newEmployee)
            const cleared = {
                name: '',
                employee_id: '',
          };
          this.setState(cleared);
        }
      }



      render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a New Sales Person</h1>
                <form onSubmit={this.handleSubmit} id="create-new-employee-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Employee's Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.employee_id} onChange={this.handleChange} placeholder="employee id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                    <label htmlFor="employee_id">Employee Id</label>
                  </div>

                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }



export default SalesPersonForm;
