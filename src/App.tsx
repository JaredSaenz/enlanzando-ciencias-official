import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Actividades from './pages/Actividades'
import Divulgacion from './pages/Divulgacion'
import Unete from './pages/Unete'
import Contacto from './pages/Contacto'

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

