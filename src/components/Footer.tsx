import { Link } from "react-router-dom"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { useCallback } from "react"

const Footer = () => {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    if (target.src.includes('.webp')) {
      target.src = "/logo.webp"
    } else {
      target.src = "/images/placeholder.webp"
    }
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-[#552673] to-[#935da3] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción optimizada */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <img
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                src="/logo.webp"
                alt="Enlazando Ciencias"
                loading="lazy"
                onError={handleImageError}
              />
              <span className="text-2xl font-bold group-hover:text-gray-200 transition-colors duration-300">
                Enlazando Ciencias
              </span>
            </Link>
            <p className="text-gray-200 mb-6 leading-relaxed max-w-md">
              Conectando el conocimiento científico con la comunidad a través de experiencias 
              educativas únicas, talleres interactivos y divulgación accesible para todos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/enlazandociencias"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/enlazandociencias"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@enlazandociencias.com"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Envíanos un email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos optimizados */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: "Inicio", href: "/" },
                { name: "Quiénes Somos", href: "/quienes-somos" },
                { name: "Actividades", href: "/actividades" },
                { name: "Divulgación", href: "/divulgacion" },
                { name: "Periódico", href: "/periodico" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto optimizado */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200 text-sm leading-relaxed">
                  Universidad Autónoma de Yucatán<br />
                  Facultad de Química<br />
                  Mérida, Yucatán, México
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-gray-200 text-sm">+52 999 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:contacto@enlazandociencias.com"
                  className="text-gray-200 text-sm hover:text-white transition-colors duration-300"
                >
                  contacto@enlazandociencias.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright optimizados */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200 text-sm">
              © {currentYear} Enlazando Ciencias. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/contacto"
                className="text-gray-200 hover:text-white text-sm transition-colors duration-300"
              >
                Política de Privacidad
              </Link>
              <Link
                to="/contacto"
                className="text-gray-200 hover:text-white text-sm transition-colors duration-300"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer