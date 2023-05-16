import React from "react";

class SalesRecordList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sale_records: []
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ [event.target.name]: value }) //sets state name : value you typed
    }

    async componentDidMount() { // used to update state & state will rerender
        const url =  `http://localhost:8090/api/salerecords/`;
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            this.setState({ "sale_records" : data.sale_records })
        }
    }

    catch (e) {
    }


render() {
    return (
        <>
        <h1>All Sales </h1>
        <table className='table table-striped' >
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Employee ID</th>
                    <th>Customer's Name</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {this.state.sale_records.map(sale_record => {
                    return (
                        <tr key={sale_record.id}>
                            <td>{ sale_record.sales_person_name }</td>
                            <td>#{ sale_record.sales_person_id }</td>
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
export default SalesRecordList;
