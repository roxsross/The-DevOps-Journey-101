import React from "react";

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    handleChange(event) {//every time you press a key, it's firing
        const value = event.target.value; //value is what you type
        this.setState({ [event.target.name]: value }) //sets state name : value you typed
    }

    async componentDidMount() {
        const url = `http://localhost:8080/api/appointments/`;
        let response = await fetch(url);
        if (response.ok) {
          let data = await response.json();
          // Only keep appointments where completed is false
          const appointments = data.appointments.filter(appointment => appointment.completed === false);
          this.setState({ appointments });
        }
      }

    async handleConfirm(event) {
        const id = event.target.value
        const appUrl = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({completed: true }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(appUrl, fetchConfig);
        if (response.ok) {
            const newAppList = this.state.appointments.filter(appointment => appointment.id != id)
            this.setState({ "appointments": newAppList })
        }
    }
    async handleDelete(event) {
        const id = event.target.value
        const appUrl = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(appUrl, fetchConfig);
        if (response.ok) {
            const newAppList = this.state.appointments.filter(appointment => appointment.id != id)
            this.setState({ "appointments": newAppList })
        }
    }

    catch (e) {
    }



render() {
    return (
        <>
        <h1>Appointments</h1>
        <table className='table table-striped' >
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Vehicle Owner</th>
                    <th>Date & Time</th>
                    <th>Reason</th>
                    <th>Technician</th>
                    <th>VIP</th>
                </tr>
            </thead>
            <tbody>
                {this.state.appointments.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vehicle_owner }</td>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.technician.name }</td>
                            <td>{appointment.is_vip ? "Yes" : ""}</td>
                            <td><button onClick={this.handleDelete} value = {appointment.id} className = "button">Delete</button></td>
                            <td><button onClick={this.handleConfirm} value = {appointment.id} className = "button">Confirm</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    );
}}

export default AppointmentList;
