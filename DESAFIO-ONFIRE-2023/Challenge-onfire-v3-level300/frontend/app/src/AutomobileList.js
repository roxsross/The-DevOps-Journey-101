import React from "react";

class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: []
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ [event.target.name]: value }) //sets state name : value you typed
    }

    async componentDidMount() { // used to update state & state will rerender
        const url =  `http://localhost:8100/api/automobiles/`;
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            this.setState({ "autos" : data.autos })
        }
    }

    catch (e) {
    }



render() {
    return (
        <>
        <h1>Automobiles</h1>
        <table className='table table-striped' >
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Year</th>
                    <th>VIN</th>
                    <th>Model</th>
                </tr>
            </thead>
            <tbody>
                {this.state.autos.map(auto => {
                    return (
                        <tr key={auto.id}>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.vin} </td>
                            <td>{auto.model.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    );
}}

export default AutomobileList;
