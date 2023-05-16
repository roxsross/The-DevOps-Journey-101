import React from 'react';

class CustomersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',
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

    const url = 'http://localhost:8090/api/salescustomers/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newCustomer= await response.json();
        // console.log(newCustomer)
        const cleared = {
            name: '',
            address: '',
            phone: '',
      };
      this.setState(cleared);
    }
  }



  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a New Customer</h1>
            <form onSubmit={this.handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Customer's Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.address} onChange={this.handleChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.phone} onChange={this.handleChange} placeholder="Phone number" required type="text" name="phone" id="phone" className="form-control" />
                <label htmlFor="phone">Phone number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomersForm;
