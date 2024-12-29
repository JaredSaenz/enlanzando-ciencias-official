import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-[#552673] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.png" alt="Enlazando Ciencias" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#935da3] hover:text-white">Inicio</Link>
              <Link to="/quienes-somos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#935da3] hover:text-white">¿Quiénes somos?</Link>
              <Link to="/actividades" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#935da3] hover:text-white">Actividades</Link>
              <Link to="/divulgacion" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#935da3] hover:text-white">Divulgación</Link>
              <Link to="/unete" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#935da3] hover:text-white">¿Quieres unirte?</Link>
              <Link to="/contacto" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#935da3] hover:text-white">Contacto</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#935da3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#935da3] hover:text-white">Inicio</Link>
            <Link to="/quienes-somos" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#935da3] hover:text-white">¿Quiénes somos?</Link>
            <Link to="/actividades" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#935da3] hover:text-white">Actividades</Link>
            <Link to="/divulgacion" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#935da3] hover:text-white">Divulgación</Link>
            <Link to="/unete" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#935da3] hover:text-white">¿Quieres unirte?</Link>
            <Link to="/contacto" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#935da3] hover:text-white">Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar