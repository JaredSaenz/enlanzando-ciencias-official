import React from 'react'
import AnimatedSection from '../components/AnimatedSection'

const Actividades = () => {
  const sections = [
    {
      title: "Talleres",
      description: "En Enlazando Ciencias ofrecemos talleres prácticos y creativos diseñados para acercar la ciencia a la vida cotidiana. Entre nuestras actividades destacan la elaboración de repelentes naturales, delineadores caseros, jabones artesanales y arte en agar, donde la biología y la creatividad se unen. Cada taller busca inspirar, enseñar y mostrar cómo la ciencia puede ser divertida y útil para todos. ¡Descubre la ciencia de una manera única con nosotros!",
      image: "/actividades_talleres.jpg",
      photos: [
        { src: "/actividades_popboba.jpg", subtitle: "Popping boba" },
        { src: "/actividades_delin.jpg", subtitle: "Delineadores" },
        { src: "/actividades_velas.jpg", subtitle: "Velas" }
      ]
    },
    {
      title: "Hoy en tu Comunidad",
      description: "Enlazando Ciencias se enorgullece de participar en el programa 'Hoy en tu Comunidad' de la UADY, llevando actividades de divulgación científica a comunidades. A través de dinámicas interactivas y educativas, buscamos despertar la curiosidad y fomentar el aprendizaje en niños, jóvenes y adultos. Nuestra labor refuerza el compromiso social de la universidad, conectando el conocimiento académico con las necesidades reales de la sociedad.",
      image: "/actividades_hetc.jpg",
      photos: [
        { src: "/photo4.jpg", subtitle: "Foto 4" },
        { src: "/photo5.jpg", subtitle: "Foto 5" },
        { src: "/photo6.jpg", subtitle: "Foto 6" }
      ]
    },
    {
      title: "Conferencias",
      description: "En Enlazando Ciencias impartimos conferencias dinámicas y educativas que abordan temas de interés científico y cotidiano. Algunas de nuestras charlas incluyen: 'Cómo usar tu calculadora científica', 'Antibióticos: ¿Amigos o enemigos?' y 'El papel de la mujer en la investigación y divulgación científica'. Cada conferencia busca informar, inspirar y generar reflexión sobre la importancia de la ciencia en nuestra vida diaria.",
      image: "/path-to-conferencias-image.jpg",
      photos: [
        { src: "/photo7.jpg", subtitle: "Foto 7" },
        { src: "/photo8.jpg", subtitle: "Foto 8" },
        { src: "/photo9.jpg", subtitle: "Foto 9" }
      ]
    }
  ]

  return (    
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/mesa_directiva_EC.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-6xl font-bold text-white text-center">Nuestras Actividades</h1>
        </div>
      </div>
    
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <div key={index} className="mb-24">
            {/* Main Section Content */}
            <AnimatedSection>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className={`flex flex-col justify-center ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}>
                  <h2 className="text-4xl font-bold text-[#552673] mb-6 decoration-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {section.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Photos Grid */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {section.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="flex flex-col items-center">
                    <img
                      src={photo.src}
                      alt={photo.subtitle}
                      className="w-full aspect-4/3 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold text-[#552673] hover:underline">
                      <a href="#" className="hover:text-[#935da3] transition-colors">
                        {photo.subtitle}
                      </a>
                    </h3>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Actividades

