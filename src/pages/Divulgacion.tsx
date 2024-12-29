import React from 'react'
import AnimatedSection from '../components/AnimatedSection'

const Divulgacion = () => {
  const resources = [
    {
      title: "Blog Científico",
      description: "Artículos escritos por nuestros miembros sobre temas científicos de actualidad y proyectos interdisciplinarios.",
      link: "#",
      icon: "✍️"
    },
    {
      title: "Podcast",
      description: "Conversaciones con investigadores y estudiantes sobre sus trabajos y la importancia de la colaboración interdisciplinaria.",
      link: "#",
      icon: "🎙️"
    },
    {
      title: "Canal de YouTube",
      description: "Videos educativos y entrevistas que exploran la intersección entre diferentes disciplinas científicas.",
      link: "#",
      icon: "📺"
    },
    {
      title: "Boletín Mensual",
      description: "Resumen de las últimas noticias científicas y actividades de nuestra sociedad estudiantil.",
      link: "#",
      icon: "📧"
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-[#552673] mb-8 text-center">Divulgación Científica</h1>
          <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            En Enlazando Ciencias, creemos en la importancia de compartir el conocimiento científico con la comunidad.
            A través de nuestros diversos canales de divulgación, buscamos hacer la ciencia más accesible y fomentar
            el interés por la investigación interdisciplinaria.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <AnimatedSection key={index}>
              <div className="bg-[#f3e8f7] p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h2 className="text-2xl font-semibold text-[#935da3] mb-2">{resource.title}</h2>
                <p className="text-gray-700 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="text-[#552673] font-semibold hover:text-[#935da3] transition duration-300"
                >
                  Explorar {resource.title} →
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-[#552673] mb-4">Colabora en nuestra divulgación</h2>
            <p className="text-gray-700 mb-6">
              Si eres estudiante o investigador y te interesa compartir tu trabajo a través de nuestros canales de
              divulgación, ¡nos encantaría colaborar contigo!
            </p>
            <a
              href="/contacto"
              className="inline-block bg-[#935da3] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#c5a1cc] transition duration-300"
            >
              Propón tu colaboración
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Divulgacion

