import type React from "react"

interface CascadeViewProps {
  images: string[]
}

const CascadeView: React.FC<CascadeViewProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-600">
        No hay páginas de periódico disponibles.
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      {images.map((image, index) => (
        <div key={index} className="w-full flex justify-center bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={`Página ${index + 1}`}
            className="w-full h-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=700&width=1000`
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default CascadeView
