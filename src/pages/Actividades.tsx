import React from 'react'
import AnimatedSection from '../components/AnimatedSection'

const Actividades = () => {
  const activities = [
    {
      title: "Seminarios Interdisciplinarios",
      description: "Charlas mensuales donde estudiantes de diferentes disciplinas comparten sus investigaciones y proyectos.",
      icon: "🎤"
    },
    {
      title: "Hackathons Científicos",
      description: "Eventos semestrales donde equipos multidisciplinarios resuelven problemas científicos en 48 horas.",
      icon: "💻"
    },
    {
      title: "Clubes de Lectura",
      description: "Grupos de discusión sobre artículos científicos de vanguardia en diversas áreas.",
      icon: "📚"
    },
    {
      title: "Visitas a Laboratorios",
      description: "Excursiones a laboratorios de investigación para conocer el trabajo de científicos en diferentes campos.",
      icon: "🔬"
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-[#552673] mb-8 text-center">Nuestras Actividades</h1>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <AnimatedSection key={index}>
              <div className="bg-[#f3e8f7] p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{activity.icon}</div>
                <h2 className="text-2xl font-semibold text-[#935da3] mb-2">{activity.title}</h2>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-[#552673] mb-4">¿Tienes una idea para una nueva actividad?</h2>
            <p className="text-gray-700 mb-6">
              Estamos siempre abiertos a nuevas propuestas. Si tienes una idea para una actividad que promueva la
              colaboración interdisciplinaria, ¡nos encantaría escucharla!
            </p>
            <a
              href="/contacto"
              className="inline-block bg-[#935da3] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#c5a1cc] transition duration-300"
            >
              Contáctanos
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Actividades

