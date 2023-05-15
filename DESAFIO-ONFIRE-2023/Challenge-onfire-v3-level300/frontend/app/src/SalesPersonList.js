import React from "react";

class SalesPersonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales_persons: [],
            sale_records: [],
           
        }
        this.getEmployee = this.getEmployee.bind(this);
        this.getEmployeeRecord = this.getEmployeeRecord.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    }
    handleEmployeeChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ sales_person: value }) //sets state name : value you typed

    }
    async getEmployee() {
        const url =  `http://localhost:8090/api/salesreps/`;
        let response = await fetch(url);
        if (response.ok ) {
            let data = await response.json();
            this.setState({
                "sales_persons" : data.sales_persons
            })

        }
    }
    async getEmployeeRecord() {
        const recordsUrl = 'http://localhost:8090/api/salerecords/';
        let response2 = await fetch(recordsUrl);
        if (response2.ok ) {
            let data2 = await response2.json();
            this.setState({
                "sale_records" : data2.sale_records
            })

        }
    }


    async componentDidMount() { // used to update state & state will rerender
        this.getEmployee()
        this.getEmployeeRecord()
    }





render() {
    return (
        <>
        <h1 className="mt-4 mb-4"> Personal Sales History </h1>
                    <select onChange={this.handleEmployeeChange} value={this.state.sales_person} id="sales_person" required name="sales_person" className="form-select">
                      <option value="">Choose a sales rep</option>
                      {this.state.sales_persons.map(sales_person => {
                        return (
                          <option key={sales_person.employee_id} value={sales_person.employee_id}>
                            {sales_person.name}
                          </option>
                        );
                      })}
                    </select>

        <table className='table table-striped' >
            <caption> List of sale records </caption>
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Customer</th>
                    <th>Automobile </th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {this.state.sale_records.filter(sale_record => sale_record.sales_person_id.toString() === this.state.sales_person).map(sale_record =>{
                    return (
                        <tr key={sale_record.id}>
                            <td>{ sale_record.sales_person_name }</td>
                            <td>{ sale_record.sales_customer }</td>
                            <td>{ sale_record.sales_automobile }</td>
                            <td> ${ sale_record.price }</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    );
}
}
export default SalesPersonList;
