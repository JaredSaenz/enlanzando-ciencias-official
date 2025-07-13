import { useRef } from "react"
import AnimatedSection from "../components/AnimatedSection"
import { ChevronDown } from "lucide-react"
import { TextOnly, TextWithImage, FullWidthImage, ThreeImages } from "../components/PageComponents"

const SantaMariaChi = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const section = "hect" // Corresponde a la sección 'Hoy en tu Comunidad'
  const id = "1" // ID de la actividad 'Visita a Santa María Chi' en hect.csv

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.jpg')", // Puedes cambiar esta imagen por una específica de la visita
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">
              Visita a Santa María Chi
            </h1>
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <TextOnly
            title="Un Día de Ciencia en la Comunidad"
            content={`Nuestra visita a Santa María Chi fue una experiencia enriquecedora, donde pudimos compartir la pasión por la ciencia con niños y adultos de la comunidad. Llevamos a cabo diversas actividades interactivas diseñadas para despertar la curiosidad y fomentar el aprendizaje a través del juego y la experimentación.

            El entusiasmo de los participantes fue contagioso, y ver sus rostros de asombro y alegría al descubrir nuevos conceptos científicos nos llenó de satisfacción. Creemos firmemente que la ciencia es para todos y que acercarla a las comunidades es fundamental para el desarrollo y la inspiración de las nuevas generaciones.`}
          />
        </AnimatedSection>

        <AnimatedSection>
          <TextWithImage
            title="Talleres Interactivos y Demostraciones"
            content={`Durante la jornada, organizamos varios talleres prácticos. Uno de los más populares fue el de "Química Divertida", donde los niños pudieron crear sus propios slimes y observar reacciones químicas sorprendentes de forma segura. También tuvimos demostraciones de física, explicando principios básicos de una manera muy visual y participativa.

            La interacción directa con los materiales y los experimentos permitió a los asistentes comprender conceptos complejos de una manera sencilla y memorable. Fue un espacio donde la teoría se convirtió en una experiencia tangible y emocionante.`}
            section={section}
            id={id}
            imageNumber={1} // hetc-1-1.jpg
            imagePosition="right"
          />
        </AnimatedSection>

        <AnimatedSection>
          <FullWidthImage
            section={section}
            id={id}
            imageNumber={2} // hetc-1-2.jpg
            title="Momentos de Aprendizaje y Diversión"
            caption="Los niños de Santa María Chi participando activamente en los experimentos."
          />
        </AnimatedSection>

        <AnimatedSection>
          <TextWithImage
            title="Impacto en la Comunidad"
            content={`La respuesta de la comunidad fue abrumadora. Padres, maestros y líderes comunitarios expresaron su agradecimiento por llevar este tipo de actividades a su localidad. Este tipo de iniciativas refuerza nuestro compromiso con la divulgación científica y nos motiva a seguir trabajando para que el conocimiento sea accesible para todos.

            Esperamos que esta visita haya sembrado una semilla de curiosidad y que muchos de los jóvenes de Santa María Chi se sientan inspirados a explorar el fascinante mundo de la ciencia en el futuro.`}
            section={section}
            id={id}
            imageNumber={3} // hetc-1-3.jpg
            imagePosition="left"
          />
        </AnimatedSection>

        <AnimatedSection>
          <ThreeImages
            section={section}
            id={id}
            title="Galería de la Visita"
            images={[
              { imageNumber: 4, caption: "Explicando conceptos básicos" }, // hetc-1-4.jpg
              { imageNumber: 5, caption: "Trabajo en equipo" }, // hetc-1-5.jpg
              { imageNumber: 6, caption: "Sonrisas y descubrimientos" }, // hetc-1-6.jpg (Si tienes una sexta imagen, si no, se usará el fallback)
            ]}
          />
        </AnimatedSection>
      </div>
    </div>
  )
}

export default SantaMariaChi
