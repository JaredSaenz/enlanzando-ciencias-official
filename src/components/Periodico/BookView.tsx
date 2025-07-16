"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface BookViewProps {
  images: string[]
}

const BookView: React.FC<BookViewProps> = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(0)

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextPage()
      } else if (event.key === "ArrowLeft") {
        goToPrevPage()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [goToNextPage, goToPrevPage])

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-600">
        No hay páginas de periódico disponibles.
      </div>
    )
  }

  const currentImage = images[currentPage]

  return (
    <div className="relative w-full h-[calc(200vh-10rem)] flex items-center justify-center bg-gray-200 overflow-hidden rounded-lg shadow-xl">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentPage}
          src={currentImage}
          alt={`Página ${currentPage + 1}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.currentTarget.src = `/placeholder.svg?height=700&width=1000`
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevPage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-[#552673] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#552673] z-10"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={goToNextPage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-[#552673] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#552673] z-10"
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="absolute bottom-4 text-sm text-gray-700 bg-white/70 px-3 py-1 rounded-full">
        Página {currentPage + 1} de {images.length}
      </div>
    </div>
  )
}

export default BookView
