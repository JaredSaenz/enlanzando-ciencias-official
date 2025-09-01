"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import AnimatedSection from "../../components/AnimatedSection"
import { ChevronDown, BookOpen, LayoutList, Download } from "lucide-react"
import BookView from "../../components/Periodico/BookView"
import CascadeView from "../../components/Periodico/CascadeView"
import Papa from "papaparse"

type ViewMode = "book" | "cascade"

interface NewspaperItem {
  id: string
  date: string
  title: string
  short_desc: string
  pages: string // Añadido este campo que faltaba
}

const NewspaperDetail = () => {
  const { id_section } = useParams<{ id_section: string }>()
  const contentRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("book")
  const [newspaperImages, setNewspaperImages] = useState<string[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [newspaperData, setNewspaperData] = useState<NewspaperItem | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string>("")
  const [pagesNumber, setPagesNumber] = useState<number>(0) // Mover pagesNumber al estado

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Fetch newspaper metadata
  useEffect(() => {
    const fetchNewspaperData = async () => {
      setLoadingData(true)
      setError("")
      try {
        const response = await fetch("/registros/periodico.csv", {
          method: "GET",
          headers: { "Content-Type": "text/plain" },
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (results) => {
            const data: NewspaperItem[] = results.data as NewspaperItem[]
            const foundItem = data.find((item) => item.id === id_section)
            
            if (foundItem) {
              setNewspaperData(foundItem)
              const pages = parseInt(foundItem.pages)
              setPagesNumber(isNaN(pages) ? 0 : pages) // Manejar caso NaN
            } else {
              setError("Edición de periódico no encontrada.")
            }
          },
          error: (err) => {
            console.error("PapaParse error:", err)
            setError("Error al procesar los datos del periódico.")
          },
        })
      } catch (err) {
        console.error("Error fetching periodicos CSV:", err)
        setError("No se pudieron cargar los datos del periódico en este momento.")
      } finally {
        setLoadingData(false)
      }
    }

    if (id_section) {
      fetchNewspaperData()
    }
  }, [id_section])

  // Function to generate image paths
  useEffect(() => {
    const fetchImagePaths = async () => {
      if (!id_section || pagesNumber <= 0) {
        setNewspaperImages([])
        setLoadingImages(false)
        return
      }

      setLoadingImages(true)
      try {
        const imagePaths: string[] = []
        for (let i = 1; i <= pagesNumber; i++) {
          imagePaths.push(`/actividades/periodico/news-${id_section}/news-${id_section}-${i}.webp`)
        }
        setNewspaperImages(imagePaths)
      } catch (err) {
        console.error("Error generating image paths:", err)
        setError("Error al cargar las imágenes del periódico.")
      } finally {
        setLoadingImages(false)
      }
    }

    fetchImagePaths()
  }, [id_section, pagesNumber])

  const handleDownloadPdf = useCallback(() => {
    if (!id_section) return
    const pdfUrl = `/actividades/periodico/news-${id_section}/news-${id_section}.pdf`
    window.open(pdfUrl, "_blank")
  }, [id_section])

  if (loadingData || loadingImages) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#552673]"></div>
        <div className="ml-4 text-lg text-gray-600">Cargando periódico...</div>
      </div>
    )
  }

  if (error || !newspaperData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-red-600">
        <div className="text-lg mb-4">{error || "No se pudo cargar la edición del periódico."}</div>
        <Link
          to="/periodico"
          className="px-4 py-2 bg-[#552673] text-white rounded hover:bg-[#935da3] transition-colors"
        >
          Volver al listado de periódicos
        </Link>
      </div>
    )
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
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">{newspaperData.title}</h1>
            <p className="text-xl text-white/90 mb-4">{newspaperData.short_desc}</p>
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#552673] mb-4">Explora esta edición</h2>
            <p className="text-lg text-gray-700">Puedes hojearla como un libro o ver todas las páginas en cascada.</p>
          </div>

          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setViewMode("book")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                viewMode === "book"
                  ? "bg-[#552673] text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Vista Libro
            </button>
            <button
              onClick={() => setViewMode("cascade")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                viewMode === "cascade"
                  ? "bg-[#552673] text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <LayoutList className="w-5 h-5" />
              Vista Cascada
            </button>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md"
            >
              <Download className="w-5 h-5" />
              Descargar PDF
            </button>
          </div>

          {loadingImages ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#552673]"></div>
              <div className="ml-4 text-lg text-gray-600">Cargando páginas...</div>
            </div>
          ) : (
            <>
              {newspaperImages.length === 0 ? (
                <div className="flex items-center justify-center h-96 text-gray-600">
                  No hay páginas de periódico disponibles para esta edición.
                </div>
              ) : viewMode === "book" ? (
                <BookView images={newspaperImages} />
              ) : (
                <CascadeView images={newspaperImages} />
              )}
            </>
          )}
        </AnimatedSection>
      </div>
    </div>
  )
}

export default NewspaperDetail