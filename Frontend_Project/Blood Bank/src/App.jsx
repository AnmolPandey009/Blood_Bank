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
import Stock from './Pages/Stock.jsx'
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
              <Route path="/stock" element={ <Stock />} />
            
          </Routes>
        </main>
      <Footer />
    </div>
  )
}

export default App
