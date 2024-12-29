import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'
import QuienesSomos from './pages/QuienesSomos.tsx'
import Actividades from './pages/Actividades.tsx'
import Divulgacion from './pages/Divulgacion.tsx'
import Unete from './pages/Unete.tsx'
import Contacto from './pages/Contacto.tsx'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/divulgacion" element={<Divulgacion />} />
            <Route path="/unete" element={<Unete />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

