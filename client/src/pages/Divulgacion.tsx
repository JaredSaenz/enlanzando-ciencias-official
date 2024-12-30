import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { ChevronDown } from 'lucide-react'

const Divulgacion = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null)

  const toggleTab = (index: number) => {
    setActiveTab(activeTab === index ? null : index)
  }

  // Referencia para el contenido hacia donde nos desplazaremos
  const contentRef = useRef(null)

  // Función para desplazar la página hacia el contenido
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const tabs = [
    {
      title: "La ciencia",
      content: "La ciencia es el faro que ilumina el camino hacia el conocimiento y la comprensión del mundo que nos rodea. ¡Sigamos explorando, descubriendo y aprendiendo juntos! 🔬🌍✨",
      image: "/divulgacion_ciencia.png"
    },
    {
      title: "Química",
      content: "¿Te has preguntado cómo funciona el mundo? Descubre la magia de la química. ¡Acompáñanos en este viaje científico! 🔬✨",
      image: "/divulgacion_quimica.png"
    },
    {
      title: "Clasificación de la materia",
      content: "¿Te has preguntado cómo se clasifica la materia? ¡Acompáñanos en este viaje científico! 🔬✨",
      image: "/divulgacion_materia.jpg"
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">
              Divulgación Científica
            </h1>
            {/* Flecha que rebota y al hacer clic desplaza hacia el contenido */}
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div  ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xl text-gray-700 mb-8 text-center">
            En Enlazando Ciencias, creemos en la importancia de compartir el conocimiento científico con la comunidad.
            A través de nuestros diversos canales de divulgación, buscamos hacer la ciencia más accesible y fomentar
            el interés por la investigación interdisciplinaria.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="space-y-4">
            {tabs.map((tab, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-4 py-2 text-left text-lg font-semibold bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#552673] transition-colors"
                  onClick={() => toggleTab(index)}
                >
                  {tab.title}
                </button>
                {activeTab === index && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700 mb-4">{tab.content}</p>
                    <img
                      src={tab.image}
                      alt={tab.title}
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-700 mb-4">
              Para ver más publicaciones... ¡Visítanos en Facebook!
            </p>
            <Link
              to="https://www.facebook.com/enlazandociencias"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#552673] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#935da3] transition-colors"
            >
              Visitar página de Facebook
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Divulgacion

