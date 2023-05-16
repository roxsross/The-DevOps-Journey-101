
import React from 'react';

class SalesRecordsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          price: '',
          sales_persons: [],
          sales_customers: [],
          sales_automobiles: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

      }
      handleChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ [event.target.name]: value }) //sets state name : value you typed
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.sales_persons;
        delete data.sales_customers;
        delete data.sales_automobiles;

        const postUrl = 'http://localhost:8090/api/salerecords/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(postUrl, fetchConfig);
        if (response.ok) {

        const cleared = {
          price: '',
          sales_person: '',
          sales_customer: '',
          sales_automobile: '',
        };

        this.setState(cleared);

      }
    }

      async componentDidMount() {
        const urlRecords = 'http://localhost:8090/api/salerecords/';
        const response4 = await fetch(urlRecords);
        if (response4.ok) {
          const data = await response4.json();
          const records = data.sale_records;
          const soldVins = [];
          records.map(record => { soldVins.push(record.sales_automobile) });
          const url = 'http://localhost:8100/api/automobiles/';
          const response1 = await fetch(url);
          if (response1.ok) {
            const data = await response1.json();
            const unfiltered = data.autos;
            const autos = unfiltered.filter(auto => !soldVins.includes(auto.vin))
            this.setState({ sales_automobiles : autos });
          }
        }

        const urlRep = 'http://localhost:8090/api/salesreps/';
        const urlCustomer = 'http://localhost:8090/api/salescustomers/';
        const response2 = await fetch(urlRep);
        const response3 = await fetch(urlCustomer);
        if (response2.ok && response3.ok) {
          const data2 = await response2.json();
          const data3 = await response3.json();

          this.setState({
            sales_persons: data2.sales_persons,
            sales_customers: data3.sales_customers
        });
        }
    }


      render() {

        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a New Sale Record</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                    onChange={this.handleChange}
                    placeholder="price"
                    value={this.state.price}
                    required
                    type="number"
                    min="500"
                    step="100"
                    name="price"
                    className="form-control"
                    />
                    <label htmlFor="price">Sale price</label>
                  </div>
                  <div className="mb-3">
                    {/* when you pick something from the drop down, will trigger */}
                    <select
                    onChange={this.handleChange}
                    value={this.state.sales_automobile}
                    required
                    name="sales_automobile"
                    id="sales_automobile"
                    className="form-select">
                      <option value="">Choose an automobile</option>
                      {this.state.sales_automobiles.map(sales_automobile => {
                        return (
                          <option key={sales_automobile.vin} value={sales_automobile.vin}>
                            {sales_automobile.model.name} {sales_automobile.vin}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleChange} value={this.state.sales_person} id="sales_person" required name="sales_person" className="form-select">
                      <option value="">Choose a sales rep</option>
                      {this.state.sales_persons.map(sales_person => {
                        return (
                          <option key={sales_person.employee_id} value={sales_person.employee_id}>
                            {sales_person.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleChange} value={this.state.sales_customer} required name="sales_customer" id="sales_customer" className="form-select">
                      <option value="">Choose a sales customer</option>
                      {this.state.sales_customers.map(sales_customer => {
                        return (
                          <option key={sales_customer.phone} value={sales_customer.phone}>
                            {sales_customer.name}
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

    export default SalesRecordsForm;
