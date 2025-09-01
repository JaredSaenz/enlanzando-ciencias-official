"use client"

import type React from "react"

import { useRef } from "react"
import AnimatedSection from "./AnimatedSection"
import { ChevronDown } from "lucide-react"
import { TextOnly, TextWithImage, FullWidthImage, ThreeImages } from "./PageComponents"

interface PageMetadata {
  section: string
  id: string
  titlePage: string
}

interface ComponentCall {
  type: "TextOnly" | "TextWithImage" | "FullWidthImage" | "ThreeImages"
  params: any[]
}

interface DynamicPageRendererProps {
  metadata: PageMetadata
  components: ComponentCall[]
}

const DynamicPageRenderer: React.FC<DynamicPageRendererProps> = ({ metadata, components }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const renderComponent = (component: ComponentCall, index: number) => {
    // Replace 'section' and 'id' variables with actual values
    const processedParams = component.params.map((param) => {
      if (param === "section") return metadata.section
      if (param === "id") return metadata.id
      return param
    })

    switch (component.type) {
      case "TextOnly":
        return (
          <AnimatedSection key={index}>
            <TextOnly title={processedParams[0]} content={processedParams[1]} />
          </AnimatedSection>
        )

      case "TextWithImage":
        return (
          <AnimatedSection key={index}>
            <TextWithImage
              title={processedParams[0]}
              content={processedParams[1]}
              section={processedParams[2]}
              id={processedParams[3]}
              imageNumber={processedParams[4]}
              imagePosition={processedParams[5] as "left" | "right"}
            />
          </AnimatedSection>
        )

      case "FullWidthImage":
        return (
          <AnimatedSection key={index}>
            <FullWidthImage
              title={processedParams[0]}
              caption={processedParams[1]}
              section={processedParams[2]}
              id={processedParams[3]}
              imageNumber={processedParams[4]}
            />
          </AnimatedSection>
        )

      case "ThreeImages":
        return (
          <AnimatedSection key={index}>
            <ThreeImages
              section={processedParams[0]}
              id={processedParams[1]}
              title={processedParams[2]}
              images={processedParams[3]}
            />
          </AnimatedSection>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">{metadata.titlePage}</h1>
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {components.map((component, index) => renderComponent(component, index))}
      </div>
    </div>
  )
}

export default DynamicPageRenderer
