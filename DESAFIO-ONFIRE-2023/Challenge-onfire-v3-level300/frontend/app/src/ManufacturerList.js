import React from 'react';

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturers: []
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value })
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            this.setState({ "manufacturers": data.manufacturers})
        }
    }

    catch (e) {

    }

    render() {
        return (
            <>
                <h1>Manufacturers</h1>
                <table className='table table-striped' >
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.manufacturers.map(manufacturer => {
                            return (
                                <tr key={manufacturer.id}>
                                    <td>{ manufacturer.name }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>

        );
    }
}
export default ManufacturerList
