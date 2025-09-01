import type React from "react"

interface ThreeImagesProps {
  section: string
  id: string
  title?: string
  images: {
    imageNumber: number
    caption?: string
  }[]
  className?: string
}

const ThreeImages: React.FC<ThreeImagesProps> = ({ section, id, title, images, className = "" }) => {
  // Mapeo de secciones a sus versiones cortas
  const sectionMap: Record<string, string> = {
    talleres: "tall",
    conferencias: "conf",
    hect: "hetc",
  }

  const shortSection = sectionMap[section] || section
  const fallbackSrc = `/actividades/actividades_${section}.webp`

  // Asegurar que tenemos exactamente 3 imágenes
  const imageData = images.slice(0, 3).map((img, index) => ({
    ...img,
    imageNumber: img.imageNumber || index + 1,
  }))

  // Rellenar con imágenes por defecto si faltan
  while (imageData.length < 3) {
    imageData.push({
      imageNumber: imageData.length + 1,
      caption: undefined,
    })
  }

  return (
    <div className={`bg-[#552673] text-white rounded-lg shadow-lg mb-8 p-6 ${className}`}>
      {title && <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {imageData.map((imageInfo, index) => {
          const imageSrc = `/actividades/${section}/${shortSection}-${id}/${shortSection}-${id}-${imageInfo.imageNumber}.webp`

          return (
            <div key={index} className="flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-md bg-white/10">
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageInfo.caption || `Imagen ${imageInfo.imageNumber}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (target.src !== fallbackSrc) {
                      target.src = fallbackSrc
                    } else {
                      target.src = `/placeholder.svg?height=300&width=300`
                    }
                  }}
                />
              </div>

              {imageInfo.caption && (
                <p className="mt-3 text-center text-sm text-white/90 italic">{imageInfo.caption}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ThreeImages
