import React from 'react'

const QuienesSomos = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#552673] mb-8 text-center">¿Quiénes somos?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#935da3] mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 mb-6">
              Enlazando Ciencias es una sociedad estudiantil dedicada a fomentar la colaboración interdisciplinaria
              entre diferentes ramas científicas. Nuestra misión es crear un espacio donde estudiantes de diversas
              disciplinas puedan compartir conocimientos, desarrollar proyectos innovadores y promover el pensamiento
              crítico en la comunidad académica.
            </p>
            <h2 className="text-2xl font-semibold text-[#935da3] mb-4">Nuestros Valores</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Colaboración interdisciplinaria</li>
              <li>Innovación y creatividad</li>
              <li>Pensamiento crítico</li>
              <li>Divulgación científica</li>
              <li>Responsabilidad social</li>
            </ul>
          </div>
          <div className="bg-[#c5a1cc] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Nuestro Equipo</h2>
            <p className="text-white mb-4">
              Somos un grupo diverso de estudiantes apasionados por la ciencia y la innovación. Nuestro equipo está
              formado por estudiantes de diferentes carreras, incluyendo:
            </p>
            <ul className="list-disc list-inside text-white mb-6">
              <li>Biología</li>
              <li>Física</li>
              <li>Química</li>
              <li>Matemáticas</li>
              <li>Ingeniería</li>
              <li>Ciencias de la Computación</li>
            </ul>
            <p className="text-white">
              Juntos, trabajamos para crear un ambiente de aprendizaje colaborativo y fomentar el intercambio de ideas
              entre diferentes disciplinas científicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuienesSomos

