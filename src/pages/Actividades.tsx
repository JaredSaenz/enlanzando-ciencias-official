import { useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import AnimatedSection from "../components/AnimatedSection"
import { ChevronDown } from "lucide-react"

const Actividades = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = useCallback(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const sections = [
    {
      title: "Talleres",
      description:
        "En Enlazando Ciencias ofrecemos talleres prácticos y creativos diseñados para acercar la ciencia a la vida cotidiana. Entre nuestras actividades destacan la elaboración de repelentes naturales, delineadores caseros, jabones artesanales y arte en agar, donde la biología y la creatividad se unen. Cada taller busca inspirar, enseñar y mostrar cómo la ciencia puede ser divertida y útil para todos. ¡Descubre la ciencia de una manera única con nosotros!",
      image: "/actividades/actividades_talleres.webp",
      fallbackImage: "/actividades/actividades_talleres.webp",
      link: "/actividades/talleres",
      photos: [
        { src: "/actividades/talleres/tall-1/tall-1-1.webp", fallback: "/actividades/talleres/tall-1/tall-1-1.webp", subtitle: "Popping boba", link: "/actividades/talleres/2" },
        { src: "/actividades/talleres/tall-2/tall-2-1.webp", fallback: "/actividades/talleres/tall-2/tall-2-1.webp", subtitle: "Delineadores", link: "/actividades/talleres/1" },
        { src: "/actividades/talleres/tall-3/tall-3-1.webp", fallback: "/actividades/talleres/tall-3/tall-3-1.webp", subtitle: "Velas", link: "/actividades/talleres/3" },
      ],
    },
    {
      title: "Hoy en tu Comunidad",
      description:
        "Enlazando Ciencias se enorgullece de participar en el programa 'Hoy en tu Comunidad' de la UADY, llevando actividades de divulgación científica a comunidades. A través de dinámicas interactivas y educativas, buscamos despertar la curiosidad y fomentar el aprendizaje en niños, jóvenes y adultos. Nuestra labor refuerza el compromiso social de la universidad, conectando el conocimiento académico con las necesidades reales de la sociedad.",
      image: "/actividades/actividades_hetc.webp",
      fallbackImage: "/actividades/actividades_hetc.webp",
      link: "/actividades/hetc",
      photos: [
        { src: "/actividades/hetc/hetc-1/hetc-1-1.webp", fallback: "/actividades/hetc/hetc-1/hetc-1-1.webp", subtitle: "Santa María Chi", link: "/actividades/hetc/1" },
        { src: "/actividades/hetc/hetc-2/hetc-2-1.webp", fallback: "/actividades/hetc/hetc-2/hetc-2-1.webp", subtitle: "Kichil", link: "/actividades/hetc/2" },
        { src: "/actividades/hetc/hetc-3/hetc-3-1.webp", fallback: "/actividades/hetc/hetc-3/hetc-3-1.webp", subtitle: "Xaya, Tekax", link: "/actividades/hetc/3" },
      ],
    },
    {
      title: "Conferencias",
      description:
        "En Enlazando Ciencias impartimos conferencias dinámicas y educativas que abordan temas de interés científico y cotidiano. Algunas de nuestras charlas incluyen: 'Cómo usar tu calculadora científica', 'Antibióticos: ¿Amigos o enemigos?' y 'El papel de la mujer en la investigación y divulgación científica'. Cada conferencia busca informar, inspirar y generar reflexión sobre la importancia de la ciencia en nuestra vida diaria.",
      image: "/actividades/actividades_conferencias.webp",
      fallbackImage: "/actividades/actividades_conferencias.webp",
      link: "/actividades/conferencias",
      photos: [
        {
          src: "/actividades/conferencias/conf-1/conf-1-1.webp",
          fallback: "/actividades/conferencias/conf-1/conf-1-1.webp",
          subtitle: "Conferencia Científica",
          link: "/actividades/conferencias/1",
        },
        {
          src: "/actividades/conferencias/conf-1/conf-1-1.webp",
          fallback: "/actividades/conferencias/conf-1/conf-1-1.webp",
          subtitle: "Antibióticos: ¿Amigos o enemigos?",
          link: "/actividades/conferencias/1",
        },
        {
          src: "/actividades/conferencias/conf-1/conf-1-1.webp",
          fallback: "/actividades/conferencias/conf-1/conf-1-1.webp",
          subtitle: "Ciencia y Sociedad",
          link: "/actividades/conferencias/1",
        },
      ],
    },
  ]

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>, fallbackSrc?: string) => {
    const target = e.currentTarget
    if (fallbackSrc && target.src !== fallbackSrc) {
      target.src = fallbackSrc
    } else {
      target.src = "/images/Placeholder.webp"
    }
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Optimized Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4 drop-shadow-lg">
              Nuestras Actividades
            </h1>
            <button
              onClick={scrollToContent}
              className="animate-bounce text-white cursor-pointer hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-2"
              aria-label="Desplazarse al contenido"
            >
              <ChevronDown className="h-10 w-10 mx-auto" />
            </button>
          </AnimatedSection>
        </div>
      </div>

      {/* Optimized Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <section key={index} className="mb-24">
            {/* Main Section Content */}
            <AnimatedSection>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Link to={section.link} className="block group">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-auto rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                        loading={index === 0 ? "eager" : "lazy"}
                        onError={(e) => handleImageError(e, section.fallbackImage)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </div>
                  </Link>
                </div>
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <Link to={section.link} className="block mb-6 group">
                    <h2 className="text-4xl font-bold text-[#552673] decoration-4 group-hover:text-[#935da3] transition-colors duration-300">
                      {section.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700 text-lg leading-relaxed">{section.description}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Optimized Photos Grid */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {section.photos.map((photo, photoIndex) => (
                  <article key={photoIndex} className="flex flex-col items-center group">
                    <Link to={photo.link} className="block mb-4 w-full">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={photo.src}
                          alt={photo.subtitle}
                          className="w-full aspect-[4/3] object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => handleImageError(e, photo.fallback)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </div>
                    </Link>
                    <Link to={photo.link} className="block group-hover:scale-105 transition-transform duration-200">
                      <h3 className="text-2xl font-semibold text-[#552673] group-hover:text-[#935da3] transition-colors duration-300 text-center">
                        {photo.subtitle}
                      </h3>
                    </Link>
                  </article>
                ))}
              </div>
            </AnimatedSection>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Actividades