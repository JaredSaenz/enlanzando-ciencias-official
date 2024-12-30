import React from 'react'
import AnimatedSection from '../components/AnimatedSection'
import { PhoneIcon as WhatsappIcon } from 'lucide-react'

const Unete = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[50vh]" style={{ backgroundImage: "url('/path-to-unete-hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white text-center">Únete a Enlazando Ciencias</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#552673] mb-6">¡Gracias por tu interés!</h2>
            <p className="text-xl text-gray-700 mb-8">
              Nos emociona que quieras formar parte de Enlazando Ciencias y compartir con nosotros la magia de divulgar.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-[#f3e8f7] rounded-lg shadow-lg p-8 mt-8">
            <h3 className="text-2xl font-semibold text-[#552673] mb-4">¿Cómo unirte?</h3>
            <p className="text-lg text-gray-700 mb-6">
              Para comenzar esta emocionante aventura, únete a nuestro grupo de WhatsApp. 
              Allí nos pondremos en contacto contigo y te daremos toda la información necesaria.
            </p>
            <a 
              href="https://chat.whatsapp.com/Ck31YZMkxTB4sPYahkDJor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#25D366] hover:bg-[#128C7E] md:py-4 md:text-lg md:px-10 transition-colors duration-300"
            >
              <WhatsappIcon className="w-6 h-6 mr-2" />
              Unirse al grupo de WhatsApp
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-[#552673] mb-4">¿Por qué unirte a Enlazando Ciencias?</h3>
            <ul className="text-lg text-gray-700 space-y-4">
              <li>🔬 Participa en emocionantes proyectos de divulgación científica</li>
              <li>🤝 Conoce a otros apasionados por la ciencia</li>
              <li>🌟 Desarrolla habilidades de comunicación y liderazgo</li>
              <li>🌍 Contribuye a la educación científica de tu comunidad</li>
              <li>🚀 Sé parte de un equipo innovador y dinámico</li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Unete

