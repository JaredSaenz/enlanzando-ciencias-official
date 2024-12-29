import React from 'react'

const Unete = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#552673] mb-8 text-center">¿Quieres unirte a Enlazando Ciencias?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#935da3] mb-4">¿Por qué unirte?</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Colabora en proyectos interdisciplinarios innovadores</li>
              <li>Amplía tu red de contactos académicos y profesionales</li>
              <li>Desarrolla habilidades de liderazgo y trabajo en equipo</li>
              <li>Participa en eventos y actividades científicas exclusivas</li>
              <li>Contribuye a la divulgación científica en tu comunidad</li>
            </ul>
            <h2 className="text-2xl font-semibold text-[#935da3] mb-4">Requisitos</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Ser estudiante universitario de cualquier disciplina científica</li>
              <li>Tener interés en la colaboración interdisciplinaria</li>
              <li>Comprometerse a participar activamente en las actividades de la sociedad</li>
            </ul>
          </div>
          <div className="bg-[#c5a1cc] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Proceso de admisión</h2>
            <ol className="list-decimal list-inside text-white mb-6 space-y-2">
              <li>Completa el formulario de solicitud en línea</li>
              <li>Adjunta tu currículum vitae y una carta de motivación</li>
              <li>Espera la confirmación de recepción de tu solicitud</li>
              <li>Si eres preseleccionado, serás invitado a una entrevista</li>
              <li>La decisión final se comunicará por correo electrónico</li>
            </ol>
            <div className="mt-6">
              <a
                href="#"
                className="inline-block bg-[#552673] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#935da3] transition duration-300"
              >
                Aplicar ahora
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-[#552673] mb-4">¿Tienes preguntas?</h2>
          <p className="text-gray-700 mb-6">
            Si tienes alguna duda sobre el proceso de admisión o quieres saber más sobre Enlazando Ciencias,
            no dudes en contactarnos. Estaremos encantados de ayudarte.
          </p>
          <a
            href="/contacto"
            className="inline-block bg-[#935da3] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#c5a1cc] transition duration-300"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  )
}

export default Unete

