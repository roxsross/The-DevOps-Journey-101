import React from 'react';

class VehiclesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture_url: '',
      manufacturers: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.manufacturer_id = data.manufacturer
    delete data.manufacturers;
    delete data.manufacturer;

    const url = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newModel = await response.json();
        // console.log(newModel)
        const cleared = {
        name: '',
        picture_url: '',
        manufacturer: '',
      };
      this.setState(cleared);
    }
  }

  handlePictureUrlChange(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleManufacturerChange(event) {
    const value = event.target.value;
    this.setState({ manufacturer: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Vehicle Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.picture_url} onChange={this.handlePictureUrlChange} placeholder="Picture URL" type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select value={this.state.manufacturer} onChange={this.handleManufacturerChange} required name="manufacturer" id="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
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

export default VehiclesForm;
