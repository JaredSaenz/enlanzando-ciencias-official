import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.tsx"
import Footer from "./components/Footer.tsx"
import Home from "./pages/Home.tsx"
import QuienesSomos from "./pages/QuienesSomos.tsx"
import Actividades from "./pages/Actividades.tsx"
import Talleres from "./pages/Talleres.tsx"
import HoyEnTuComunidad from "./pages/HoyEnTuComunidad.tsx"
import Conferencias from "./pages/Conferencias.tsx"
import Divulgacion from "./pages/Divulgacion.tsx"
import Unete from "./pages/Unete.tsx"
import Contacto from "./pages/Contacto.tsx"
import VisitaSantaMariaChi from "./pages/hetcPages/1_SantaMariaChi.tsx"
import Periodico from "./pages/Periodico.tsx"
import NewspaperDetail from './pages/periodicoPages/NewspaperDetail.tsx'
import NotFound from "./pages/NotFound.tsx" 

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
            <Route path="/actividades/talleres" element={<Talleres />} />
            <Route path="/actividades/hetc" element={<HoyEnTuComunidad />} />
            <Route path="/actividades/hetc/1" element={<VisitaSantaMariaChi />} />
            <Route path="/periodico" element={<Periodico />} />
            <Route path="/actividades/periodico/:id_section" element={<NewspaperDetail />} />
            <Route path="/actividades/conferencias" element={<Conferencias />} />
            <Route path="/divulgacion" element={<Divulgacion />} />
            <Route path="/unete" element={<Unete />} />
            <Route path="/contacto" element={<Contacto />} />            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

