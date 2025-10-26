import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from './Components/Header.jsx'
import Home from './Components/Home.jsx'
import BloodDonationInfo from './Components/BloodDonationInfo.jsx'
import Footer from './Components/Footer.jsx'
import Cards from './Components/cards.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
