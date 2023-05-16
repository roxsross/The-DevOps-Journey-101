import React from "react";

class VehiclesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: []
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ [event.target.name]: value }) //sets state name : value you typed
    }

    async componentDidMount() { // used to update state & state will rerender
        const url =  `http://localhost:8100/api/models/`;
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            this.setState({ "models" : data.models })
        }
    }

    catch (e) {
    }



render() {
    return (
        <>
        <h1>Vehicle models </h1>
        <table className='table table-striped' >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {this.state.models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            {/* <td>{ model.picture_url }</td> */}
                            <td><img src={ model.picture_url } alt="picture_url" /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    );
}}

export default VehiclesList;
