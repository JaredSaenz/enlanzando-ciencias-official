import type React from "react"

interface FullWidthImageProps {
  section: string
  id: string
  imageNumber?: number
  title?: string
  caption?: string
  className?: string
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({
  section,
  id,
  imageNumber = 1,
  title,
  caption,
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
    <div className={`bg-[#552673] rounded-lg shadow-lg mb-8 overflow-hidden ${className}`}>
      {title && (
        <div className="p-6 pb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">{title}</h2>
        </div>
      )}

      <div className="p-4">
        <div className="relative w-full">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={title || caption || "Imagen de actividad"}
            className="w-full h-auto rounded-md object-cover"
            style={{ maxHeight: "600px" }}
            onError={(e) => {
              const target = e.currentTarget
              if (target.src !== fallbackSrc) {
                target.src = fallbackSrc
              } else {
                target.src = `/placeholder.svg?height=400&width=800`
              }
            }}
          />
        </div>
      </div>

      {caption && (
        <div className="px-6 pb-6">
          <p className="text-white text-center text-lg italic">{caption}</p>
        </div>
      )}
    </div>
  )
}

export default FullWidthImage
