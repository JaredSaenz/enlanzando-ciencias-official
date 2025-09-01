import type React from "react"

interface TextWithImageProps {
  title?: string
  content: string
  section: string
  id: string
  imageNumber?: number
  imagePosition?: "left" | "right"
  className?: string
}

const TextWithImage: React.FC<TextWithImageProps> = ({
  title,
  content,
  section,
  id,
  imageNumber = 1,
  imagePosition = "right",
  className = "",
}) => {
  // Mapeo de secciones a sus versiones cortas
  const sectionMap: Record<string, string> = {
    talleres: "tall",
    conferencias: "conf",
    hect: "hetc",
  }

  const shortSection = sectionMap[section] || section
  const imageSrc = `/actividades/${section}/${shortSection}-${id}/${shortSection}-${id}-${imageNumber}.webp`
  const fallbackSrc = `/actividades/actividades_${section}.webp`

  return (
    <div className={`bg-[#552673] text-white rounded-lg shadow-lg mb-8 overflow-hidden ${className}`}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] ${
          imagePosition === "left" ? "lg:grid-flow-col-dense" : ""
        }`}
      >
        {/* Contenido de texto */}
        <div className={`p-8 flex flex-col justify-center ${imagePosition === "left" ? "lg:col-start-2" : ""}`}>
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-line">{content}</p>
          </div>
        </div>

        {/* Imagen */}
        <div className={`relative ${imagePosition === "left" ? "lg:col-start-1" : ""}`}>
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={title || "Imagen de actividad"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget
              if (target.src !== fallbackSrc) {
                target.src = fallbackSrc
              } else {
                target.src = `/placeholder.svg?height=400&width=600`
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TextWithImage
