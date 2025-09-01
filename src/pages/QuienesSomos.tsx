"use client"

import { useRef } from "react"
import AnimatedSection from "../components/AnimatedSection"
import { ChevronDown } from "lucide-react"

const QuienesSomos = () => {
  // Referencia para el contenido hacia donde nos desplazaremos
  const contentRef = useRef(null)

  // Función para desplazar la página hacia el contenido
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className="bg-white min-h-screen">
      {/* Sección Hero con imagen de grupo */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">¿Quiénes Somos?</h1>
            {/* Flecha que rebota y al hacer clic desplaza hacia el contenido */}
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {/* Sección ¿Quiénes somos? */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[#552673] mb-6">¿Quiénes somos?</h2>
              <p className="text-gray-700 mb-6">
                Somos una agrupación estudiantil comprometida con la divulgación científica. Nuestro propósito es
                acercar el conocimiento científico a la sociedad de manera accesible y comprensible. A través de
                talleres, ferias de ciencia, conferencias y diversas actividades, buscamos inspirar a personas de todas
                las edades a explorar, aprender y apasionarse por la ciencia.
              </p>
              <p className="text-gray-700">
                Estamos convencidos de que la ciencia debe ser compartida y comprendida por todos. Por ello, trabajamos
                para construir puentes entre el conocimiento académico y la comunidad. ¡Únete a nosotros en esta
                emocionante misión de compartir el saber!
              </p>
            </div>
            <div>
              <img
                src="/quienes_somos.webp"
                alt="Nuestro grupo"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Sección Nuestra Visión */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <img
                src="/nuestra_vision.webp"
                alt="Nuestra visión"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#552673] mb-6">Nuestra Visión</h2>
              <p className="text-gray-700 mb-6">
                Nuestro objetivo es inspirar curiosidad, fomentar el aprendizaje y cultivar una pasión por la ciencia a
                través de una amplia variedad de actividades. Organizamos talleres interactivos donde los participantes
                pueden experimentar de primera mano los principios científicos, ferias de ciencia diseñadas para
                despertar asombro, conferencias con expertos que abordan temas fascinantes y actuales, y muchas otras
                iniciativas que permiten a las personas explorar el vasto universo del conocimiento científico.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Sección ¿Qué hacemos? */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[#552673] mb-6">¿Qué hacemos?</h2>
              <p className="text-gray-700 mb-6">
                En nuestra agrupación, realizamos actividades y programas enfocados en la comunicación científica de
                manera práctica e interactiva. Algunas de nuestras principales iniciativas son:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>
                  <strong>Talleres educativos:</strong> Espacios donde los participantes aprenden a través de
                  experiencias prácticas, fomentando la creatividad y el aprendizaje basado en la experimentación.
                </li>
                <li>
                  <strong>Ferias de experimentos:</strong> Eventos donde compartimos proyectos, descubrimientos y
                  actividades diseñadas para sorprender y despertar la curiosidad de niños, jóvenes y adultos.
                </li>
                <li>
                  <strong>Conferencias y charlas:</strong> Ponencias con expertos que abordan temas actuales y
                  relevantes, mostrando la importancia de la ciencia en el día a día.
                </li>
                <li>
                  <strong>Actividades comunitarias:</strong> Realizamos actividades abiertas en parques y espacios
                  públicos para llevar la ciencia a quienes más lo necesitan.
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/que_hacemos.webp"
                alt="Qué hacemos"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Video embebido local */}
        <AnimatedSection>
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#935da3] mb-6">Video destacado</h2>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              {" "}
              {/* 16:9 Aspect Ratio */}
              <video
                src="/quienes_somos.mp4"
                controls
                loop
                muted
                preload="metadata"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default QuienesSomos
