"use client"

import { useState, useCallback, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    if (target.src.includes('.webp')) {
      target.src = "/logo.jpg"
    } else {
      target.src = "/images/Placeholder.jpg"
    }
  }, [])

  // Memoized navigation items for better performance
  const navigationItems = useMemo(() => [
    { name: "Inicio", href: "/" },
    { name: "Quiénes Somos", href: "/quienes-somos" },
    { name: "Actividades", href: "/actividades" },
    { name: "Divulgación", href: "/divulgacion" },
    { name: "Periódico", href: "/periodico" },
    { name: "Únete", href: "/unete" },
    { name: "Contacto", href: "/contacto" },
  ], [])

  const isActivePath = useCallback((path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }, [location.pathname])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo optimizado */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <img
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
              src="/logo.webp"
              alt="Enlazando Ciencias"
              loading="eager"
              onError={handleImageError}
            />
            <span className="text-xl font-bold text-[#552673] group-hover:text-[#935da3] transition-colors duration-300">
              Enlazando Ciencias
            </span>
          </Link>

          {/* Desktop Navigation - Optimizado */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                    isActivePath(item.href)
                      ? "text-[#552673] bg-purple-50"
                      : "text-gray-700 hover:text-[#552673] hover:bg-gray-50"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#552673] to-[#935da3] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Optimizado */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#552673] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#552673] transition-all duration-300"
              aria-expanded="false"
              aria-label="Abrir menú principal"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Optimizado con animaciones */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navigationItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform ${
                isActivePath(item.href)
                  ? "text-[#552673] bg-purple-50 translate-x-2"
                  : "text-gray-700 hover:text-[#552673] hover:bg-gray-50 hover:translate-x-1"
              }`}
              style={{
                animationDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar