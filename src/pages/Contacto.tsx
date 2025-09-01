import React, { useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection'
import { Mail, Phone, Clock, ChevronDown } from 'lucide-react'

const Contacto = () => {
  // Referencia para el contenido hacia donde nos desplazaremos
  const contentRef = useRef(null)

  // Función para desplazar la página hacia el contenido
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">
              Contáctanos
            </h1>
            {/* Flecha que rebota y al hacer clic desplaza hacia el contenido */}
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xl text-gray-700 mb-12 text-center">
            Si deseas que acudamos a tu institución a impartir un taller, actividad y demás, no dudes en contactarnos.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#f3e8f7] rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#552673] mb-6">Escríbenos</h2>
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-[#552673] mr-4" />
                <a href="mailto:enlazando.ciencia@gmail.com" className="text-lg text-gray-700 hover:text-[#935da3] transition-colors">
                  enlazando.ciencia@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-[#f3e8f7] rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#552673] mb-6">WhatsApp</h2>
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-[#552673] mr-4" />
                <a href="tel:938--------" className="text-lg text-gray-700 hover:text-[#935da3] transition-colors">
                  938 --------
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-12 bg-[#f3e8f7] rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#552673] mb-6">Horarios de atención</h2>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-[#552673] mr-4" />
              <p className="text-lg text-gray-700">9:00 a 18:00 hrs.</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-[#552673] mb-6">¿Listo para conectar con la ciencia?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Estamos emocionados por colaborar contigo y llevar la magia de la ciencia a tu institución.
            </p>
            <a
              href="mailto:enlazando.ciencia@gmail.com"
              className="inline-block bg-[#552673] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#935da3] transition-colors text-lg"
            >
              Contáctanos ahora
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Contacto