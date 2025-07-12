"use client"

import { useRef } from "react"
import AnimatedSection from "../components/AnimatedSection"
import { ChevronDown } from "lucide-react"
import SectionList from "../components/SectionList"

const HoyEnTuComunidad = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

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
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">Hoy en tu Comunidad</h1>
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#552673] mb-4">Actividades Comunitarias</h2>
            <p className="text-lg text-gray-700">
              Conoce nuestras actividades en diferentes comunidades, llevando la ciencia directamente a donde más se
              necesita.
            </p>
          </div>
          <SectionList section="hect" />
        </AnimatedSection>
      </div>
    </div>
  )
}

export default HoyEnTuComunidad
