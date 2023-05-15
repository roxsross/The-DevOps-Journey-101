import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">DevOps</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="vehicle/new/">Create a Vehicle Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="vehicle/">Vehicle List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="manufacturers/new/">Create a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="manufacturers/">Manufacturer List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="automobiles/new/">Create an Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="automobiles/">Automobile List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="technicians/new/">Create a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="appointments/">Appointment List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="appointments/new/">Schedule an Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="appointments/history/">Service Appointment History</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="salesperson/new/">Create a Sales Person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="salesperson">Sales Person List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="customer/new/">Create a Customer</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="salesrecord/new/">Create a Sales Record</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="salesrecord">Sales Records List</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
