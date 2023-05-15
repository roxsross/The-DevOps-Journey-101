import React from 'react';

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle_owner: '',
      date_time: '',
      vin: '',
      reason: '',
      technicians: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.technician_id = data.technician
    delete data.technicians;
    delete data.technician

    const url = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newApp = await response.json();
      // Display pop-up message
      window.alert('Appointment created successfully');
      // Clear the form
      const cleared = {
        vehicle_owner: '',
        date_time: '',
        vin: '',
        reason: '',
        technician: '',
      };
      this.setState(cleared);
    }
    else {
      // Display pop-up message
      window.alert('Invalid VIN/VIN already registered');
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  }



  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Schedule a Service Appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input value={this.state.vehicle_owner} onChange={this.handleChange} placeholder="Vehicle Owner" required type="text" name="vehicle_owner" id="vehicle_owner" className="form-control" />
                <label htmlFor="name">Vehicle Owner</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleChange} placeholder="VIN" type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="picture_url">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.date_time} onChange={this.handleChange} placeholder="Date and Time" type="datetime-local" name="date_time" id="date_time" className="form-control" />
                <label htmlFor="picture_url">Date & Time</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.reason} onChange={this.handleChange} placeholder="Reason" type="reason" name="reason" id="reason" className="form-control" />
                <label htmlFor="picture_url">Reason</label>
              </div>
              <div className="mb-3">
                <select value={this.state.technician} onChange={this.handleChange} required name="technician" id="technician" className="form-select">
                  <option value="">Choose a technician</option>
                  {this.state.technicians.map(technician => {
                    return (
                      <option key={technician.id} value={technician.id}>
                        {technician.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
