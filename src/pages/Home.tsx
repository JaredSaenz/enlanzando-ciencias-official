import { useRef, useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import AnimatedSection from "../components/AnimatedSection"
import { ChevronDown, Users, Target, Eye } from "lucide-react"

const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = useCallback(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>, fallbackSrc: string) => {
    const target = e.currentTarget
    if (target.src !== fallbackSrc) {
      target.src = fallbackSrc
    } else {
      target.src = "/images/Placeholder.webp"
    }
  }, [])

  // Memoized sections data for better performance
  const sections = useMemo(() => [
    {
      id: "quienes-somos",
      title: "¿Quiénes Somos?",
      description: "Somos un grupo de estudiantes apasionados por la divulgación científica, comprometidos con acercar la ciencia a todas las personas de manera accesible y divertida.",
      image: "/quienes_somos.webp",
      fallback: "/quienes_somos.webp",
      link: "/quienes-somos",
      icon: Users,
    },
    {
      id: "que-hacemos",
      title: "¿Qué Hacemos?",
      description: "Desarrollamos talleres, conferencias y actividades comunitarias que transforman conceptos científicos complejos en experiencias educativas memorables.",
      image: "/que_hacemos.webp",
      fallback: "/que_hacemos.webp",
      link: "/actividades",
      icon: Target,
    },
    {
      id: "nuestra-vision",
      title: "Nuestra Visión",
      description: "Construir una sociedad más informada y curiosa, donde la ciencia sea parte integral de la vida cotidiana y esté al alcance de todos.",
      image: "/nuestra_vision.webp",
      fallback: "/nuestra_vision.webp",
      link: "/divulgacion",
      icon: Eye,
    },
  ], [])

  const activities = useMemo(() => [
    {
      title: "Talleres",
      image: "/inicio/talleres_EC.webp",
      fallback: "/inicio/talleres_EC.webp",
      link: "/actividades/talleres",
      description: "Experiencias prácticas y creativas"
    },
    {
      title: "Conferencias",
      image: "/inicio/conferencias_EC.webp",
      fallback: "/inicio/conferencias_EC.webp",
      link: "/actividades/conferencias",
      description: "Charlas educativas e inspiradoras"
    },
    {
      title: "Hoy en tu Comunidad",
      image: "/inicio/hetc_EC.webp",
      fallback: "/inicio/hetc_EC.webp",
      link: "/actividades/hetc",
      description: "Ciencia directa a las comunidades"
    },
  ], [])

  return (
    <div className="bg-white min-h-screen">
      {/* Optimized Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <img
              src="/logo.webp"
              alt="Enlazando Ciencias Logo"
              className="w-32 h-32 mx-auto mb-8 drop-shadow-2xl"
              loading="eager"
              onError={(e) => handleImageError(e, "/logo.webp")}
            />
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl mb-6 drop-shadow-2xl">
              Enlazando Ciencias
            </h1>
            <p className="text-xl text-gray-200 sm:text-2xl mb-8 max-w-3xl leading-relaxed drop-shadow-lg">
              Conectando el conocimiento científico con la comunidad a través de experiencias educativas únicas
            </p>
            <button
              onClick={scrollToContent}
              className="animate-bounce text-white cursor-pointer hover:text-gray-200 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 rounded-full p-3 hover:scale-110"
              aria-label="Explorar contenido"
            >
              <ChevronDown className="h-12 w-12 mx-auto" />
            </button>
          </AnimatedSection>
        </div>
      </div>

      {/* Optimized Main Sections */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <section key={section.id} className="mb-24">
            <AnimatedSection>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Link to={section.link} className="block group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => handleImageError(e, section.fallback)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#552673]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-white font-semibold text-lg">Explorar más →</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#552673] rounded-full">
                      <section.icon className="h-8 w-8 text-white" />
                    </div>
                    <Link to={section.link} className="group">
                      <h2 className="text-4xl font-bold text-[#552673] group-hover:text-[#935da3] transition-colors duration-300">
                        {section.title}
                      </h2>
                    </Link>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {section.description}
                  </p>
                  <Link
                    to={section.link}
                    className="inline-flex items-center gap-2 text-[#552673] hover:text-[#935da3] font-semibold transition-all duration-300 group"
                  >
                    Conocer más
                    <ChevronDown className="h-4 w-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </section>
        ))}
      </div>

      {/* Optimized Activities Preview */}
      <section className="bg-gradient-to-br from-[#552673] to-[#935da3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Nuestras Actividades
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Descubre las diferentes formas en que llevamos la ciencia a la comunidad
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <AnimatedSection key={activity.title}>
                <Link to={activity.link} className="block group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => handleImageError(e, activity.fallback)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#552673] mb-2 group-hover:text-[#935da3] transition-colors duration-300">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-12">
              <Link
                to="/actividades"
                className="inline-flex items-center gap-2 bg-white text-[#552673] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Ver todas las actividades
                <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default Home