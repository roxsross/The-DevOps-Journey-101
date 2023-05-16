import React from 'react';

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      year: '',
      vin: '',
      models: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.model_id = data.model
    delete data.models;
    delete data.model

    const url = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newAuto = await response.json();
        // console.log(newAuto)
        const cleared = {
        color: '',
        year: '',
        vin: '',
        model: '',
      };
      this.setState(cleared);
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
            <h1>Create an Automobile</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
              <div className="form-floating mb-3">
                <input value={this.state.color} onChange={this.handleChange} placeholder="name" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.year} onChange={this.handleChange} placeholder="text" type="text" name="year" id="year" className="form-control" />
                <label htmlFor="picture_url">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleChange} placeholder="text" type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="picture_url">VIN</label>
              </div>
              <div className="mb-3">
                <select value={this.state.model} onChange={this.handleChange} required name="model" id="model" className="form-select">
                  <option value="">Choose a model</option>
                  {this.state.models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
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

export default AutomobileForm;
