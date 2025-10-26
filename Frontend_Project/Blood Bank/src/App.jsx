import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header.jsx'
import Home from './Components/Home.jsx'
import Footer from './Components/Footer.jsx'
import BloodRequests from './Pages/BloodRequests.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import DonorRegistration from './Pages/DonorRegistation.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import RoleSelection from './Pages/RoleSelection.jsx'
import DonorSignup from './Pages/DonorSignup.jsx'
import PatientSignup from './Pages/PatientSignup.jsx'
import HospitalSignup from './Pages/HospitalSignup.jsx'
import Stock from './Pages/Stock.jsx'
import BloodInventory from './Pages/BloodInventory.jsx'
import DonationHistory from './Pages/DonationHistory.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import HospitalManagement from './Pages/HospitalManagement.jsx'
import RequestStatus from './Pages/RequestStatus.jsx'
import BloodIssue from './Pages/BloodIssue.jsx'
import BillingSystem from './Pages/BillingSystem.jsx'
function App() {

  return (
    <div className='min-h-screen flex flex-col px-10'>
      <Header />
        {/* <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/blood-donation-info" element={ <BloodDonationInfo />} />
          <Cards />
          <Footer />
        </Routes> */}
        <main className='flex-1'>
          <Routes>          
              <Route path="/" element={ <Home />} />
              <Route path="/blood-requests" element={ <BloodRequests />} />
              <Route path="/about" element={ <About />} />
              <Route path="/contact" element={ <Contact />} />
              <Route path="/dashboard" element={ <Dashboard />} />
              <Route path="/donor-registration" element={ <DonorRegistration />} />
              <Route path="/login" element={ <Login />} />
              <Route path="/signup" element={ <Signup />} />
              <Route path="/role-selection" element={ <RoleSelection />} />
              <Route path="/donor-signup" element={ <DonorSignup />} />
              <Route path="/patient-signup" element={ <PatientSignup />} />
              <Route path="/hospital-signup" element={ <HospitalSignup />} />
              <Route path="/stock" element={ <Stock />} />
              
              {/* New Blood Bank Management Pages */}
              <Route path="/blood-inventory" element={ <BloodInventory />} />
              <Route path="/donation-history" element={ <DonationHistory />} />
              <Route path="/admin-login" element={ <AdminLogin />} />
              <Route path="/admin-dashboard" element={ <AdminDashboard />} />
              <Route path="/hospital-management" element={ <HospitalManagement />} />
              <Route path="/request-status" element={ <RequestStatus />} />
              <Route path="/blood-issue" element={ <BloodIssue />} />
              <Route path="/billing-system" element={ <BillingSystem />} />
            
          </Routes>
        </main>
      <Footer />
    </div>
  )
}

export default App
