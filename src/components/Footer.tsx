import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#552673] text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a href="mailto:info@enlazandociencias.com" className="text-gray-300 hover:text-white">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-4 text-center text-gray-300">
          © {new Date().getFullYear()} Enlazando Ciencias. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer

