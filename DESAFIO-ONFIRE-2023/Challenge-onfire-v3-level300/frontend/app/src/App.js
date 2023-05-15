import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehiclesList from './VehiclesList'
import VehiclesForm from './VehiclesForm'
import SalesPersonForm from "./SalesPersonForm"
import SalesPersonList from "./SalesPersonList"
import CustomersForm from './CustomersForm'
// import CustomersList from './CustomersList'
import SalesRecordsForm from './SalesRecordsForm'
import SalesRecordsList from './SalesRecordsList'


import ManufacturerForm from './ManufacturerForm'
import ManufacturerList from './ManufacturerList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentHistory from './AppointmentHistory';


function App() {

  return (

    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="vehicle" element={<VehiclesList />} />
          <Route path="vehicle/new" element={<VehiclesForm />} />
          <Route path="salesperson" element={<SalesPersonList />} />
          <Route path="salesperson/new" element={<SalesPersonForm />} />
          {/* <Route path="customer" element={<CustomersList />} /> */}
          <Route path="customer/new" element={<CustomersForm />} />
          <Route path="salesrecord" element={<SalesRecordsList />} />
          <Route path="salesrecord/new" element={<SalesRecordsForm />} />

          <Route path="manufacturers" element={<ManufacturerList/> } />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
          <Route path="automobiles/new" element={<AutomobileForm />} />
          <Route path="automobiles/" element={<AutomobileList />} />
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
          <Route path="appointments/history" element={<AppointmentHistory />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
