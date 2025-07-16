"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Papa from "papaparse"
import { Link } from "react-router-dom"

interface NewsItem {
  id: string // ID del registro en actividades.csv
  id_section: string // ID dentro de la sección específica (ej: 1 para hect-1)
  section: string // Nombre de la sección (ej: 'talleres', 'hect', 'conferencias')
  date: string
  title: string
  short_desc: string
  parsedDate?: Date
}

const NewsBar: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  // Mapeo de secciones a sus versiones cortas para rutas de imágenes
  const sectionMap: Record<string, string> = {
    talleres: "tall",
    conferencias: "conf",
    hect: "hetc",
    periodico: "news"
  }

  // Función de parseo de fechas (copiada de SectionList para consistencia)
  const parseDate = useCallback((dateString: string): Date | null => {
    if (!dateString) return null

    const ddMmYyyyMatch = dateString.match(/^(\d{2})-(\d{2})-(\d{4})$/)
    if (ddMmYyyyMatch) {
      const [, day, month, year] = ddMmYyyyMatch
      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
      if (!isNaN(date.getTime())) {
        return date
      }
    }

    const yyyyMmDdMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (yyyyMmDdMatch) {
      const [, year, month, day] = yyyyMmDdMatch
      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
      if (!isNaN(date.getTime())) {
        return date
      }
    }

    const ddMmYyyySlashMatch = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (ddMmYyyySlashMatch) {
      const [, day, month, year] = ddMmYyyySlashMatch
      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
      if (!isNaN(date.getTime())) {
        return date
      }
    }

    return null
  }, [])

  const formatDate = useCallback(
    (dateString: string): string => {
      if (!dateString) return ""
      const date = parseDate(dateString)
      if (!date) return dateString

      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    },
    [parseDate],
  )

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await fetch("/registros/actividades.csv", {
          method: "GET",
          headers: {
            "Content-Type": "text/plain",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const csvText = await response.text()

        if (!csvText || csvText.trim().length === 0) {
          setNewsItems([])
          return
        }

        Papa.parse(csvText, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error("CSV parsing errors:", results.errors)
              setError("Error al procesar los datos de actividades.")
              setNewsItems([])
              return
            }

            const parsedData: NewsItem[] = results.data
              .map((row: any) => ({
                id: row.id || "",
                id_section: row.id_section || "",
                section: row.section || "",
                date: row.date || "",
                title: row.title || "Sin título",
                short_desc: row.short_desc || "Sin descripción",
                parsedDate: parseDate(row.date || ""),
              }))
              .filter((item) => item.id && item.id_section && item.section) // Filtrar elementos incompletos

            // Ordenar por ID de forma descendente y tomar los últimos 3
            const latestItems = parsedData.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id)).slice(0, 3)

            setNewsItems(latestItems)
          },
          error: (err) => {
            console.error("PapaParse error:", err)
            setError("Error al parsear el archivo CSV.")
            setNewsItems([])
          },
        })
      } catch (err) {
        console.error("Error fetching activities CSV:", err)
        setError("No se pudieron cargar las últimas noticias en este momento.")
        setNewsItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [parseDate]) // Dependencia de parseDate

  const totalGroups = Math.ceil(newsItems.length / 3)

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups)
  }

  const prevGroup = () => {
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups)
  }

  if (loading) {
    return (
      <div className="bg-gray-100 py-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#552673]"></div>
        <div className="ml-3 text-gray-600">Cargando noticias...</div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-gray-100 py-6 text-center text-red-600">{error}</div>
  }

  if (newsItems.length === 0) {
    return (
      <div className="bg-gray-100 py-6 text-center text-gray-600">No hay noticias disponibles en este momento.</div>
    )
  }

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#552673] mb-4">Últimas Noticias</h2>
        <div className="relative">
          {newsItems.length > 3 && ( // Solo mostrar botones si hay más de 3 elementos
            <>
              <button
                onClick={prevGroup}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              >
                <ChevronLeft className="w-6 h-6 text-[#552673]" />
              </button>
              <button
                onClick={nextGroup}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              >
                <ChevronRight className="w-6 h-6 text-[#552673]" />
              </button>
            </>
          )}
          <div className="flex justify-center sm:justify-between space-x-4 overflow-hidden">
            {newsItems.slice(currentGroup * 3, currentGroup * 3 + 3).map((item) => {
              const shortSection = sectionMap[item.section] || item.section
              const imagePath = `/actividades/${item.section}/${shortSection}-${item.id_section}/${shortSection}-${item.id_section}-1.jpg`
              const fallbackSectionImage = `/actividades/actividades_${item.section}.jpg`
              const linkPath = `/actividades/${item.section}/${item.id_section}`

              return (
                <div
                  key={item.id}
                  className="w-full sm:w-1/3 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
                >
                  <Link to={linkPath} className="block">
                    <img
                      src={imagePath || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        if (target.src !== fallbackSectionImage) {
                          target.src = fallbackSectionImage
                        } else {
                          target.src = `/placeholder.svg?height=192&width=384`
                        }
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#552673] truncate mb-1">{item.title}</h3>
                      {item.date && item.date !== "" && (
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.date)}
                        </p>
                      )}
                      <p className="text-gray-700 text-sm line-clamp-2">{item.short_desc}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsBar
