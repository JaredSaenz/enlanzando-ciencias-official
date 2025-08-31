"use client"

import type React from "react"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Calendar, Filter, SortAsc, SortDesc } from "lucide-react"
import { Link } from "react-router-dom"

interface CsvItem {
  id: string
  date: string
  title: string
  short_desc: string
  parsedDate?: Date
}

interface SectionListProps {
  section: string // talleres, hetc, conferencias, periodico
}

type SortOrder = "newest" | "oldest"
type TimeFilter = "all" | "thisWeek" | "thisMonth" | "last3Months" | "thisYear"

const SectionList: React.FC<SectionListProps> = ({ section }) => {
  const [items, setItems] = useState<CsvItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all")
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // Mapeo de secciones a sus versiones cortas
  const sectionMap: Record<string, string> = {
    talleres: "tall",
    conferencias: "conf",
    hetc: "hetc",
    periodico: "news"
  }

  const shortSection = sectionMap[section] || section

  // Parse different date formats
  const parseDate = useCallback((dateString: string): Date | null => {
    if (!dateString) return null

    const cleanDate = dateString.trim()
    const formats = [
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
      /^\d{1,2}-\d{1,2}-\d{4}$/, // D-M-YYYY or DD-M-YYYY or D-MM-YYYY
    ]

    for (const format of formats) {
      if (format.test(cleanDate)) {
        let date: Date

        if (cleanDate.includes("-") && cleanDate.length === 10 && cleanDate.indexOf("-") === 4) {
          date = new Date(cleanDate)
        } else if (cleanDate.includes("/")) {
          const [day, month, year] = cleanDate.split("/")
          date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        } else if (cleanDate.includes("-")) {
          const parts = cleanDate.split("-")
          if (parts.length === 3) {
            const day = parseInt(parts[0])
            const month = parseInt(parts[1])
            const year = parseInt(parts[2])
            
            if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900) {
              date = new Date(year, month - 1, day)
            } else {
              continue
            }
          } else {
            continue
          }
        } else {
          continue
        }

        if (!isNaN(date.getTime())) {
          return date
        }
      }
    }

    return null
  }, [])

  // Load CSV data with optimized fetch
  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`/registros/${section}.csv`, {
          method: "GET",
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=300" // Cache for 5 minutes
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const csvText = await response.text()

        if (!csvText || csvText.trim().length === 0) {
          setItems([])
          return
        }

        const lines = csvText
          .trim()
          .split("\n")
          .filter((line) => line.trim().length > 0)

        if (lines.length <= 1) {
          setItems([])
          return
        }

        const data: CsvItem[] = []

        // Skip header line and process data lines
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue

          const values = line.split(";").map((value) => value.trim().replace(/^"(.*)"$/, '$1'))

          if (values.length >= 4 && values[0] && values[0] !== "") {
            const item: CsvItem = {
              id: values[0],
              date: values[1] || "",
              title: values[2] || "Sin título",
              short_desc: values[3] || "Sin descripción",
            }

            if (item.date) {
              const parsedDate = parseDate(item.date)
              if (parsedDate) {
                item.parsedDate = parsedDate
              }
            }

            data.push(item)
          }
        }

        // Sort by ID (newest first)
        data.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        setItems(data)
      } catch (err) {
        console.error("Error loading CSV:", err)
        setError("No se pudieron cargar los datos en este momento")
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    if (section) {
      fetchCsvData()
      setSortOrder("newest")
      setTimeFilter("all")
    }
  }, [section, parseDate])

  // Optimized filter and sort with useMemo
  const filteredAndSortedItems = useMemo(() => {
    if (items.length === 0) return []

    let filtered = [...items]

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date()
      let filterDate: Date

      switch (timeFilter) {
        case "thisWeek":
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
          break
        case "thisMonth":
          filterDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        case "last3Months":
          filterDate = new Date(now.getFullYear(), now.getMonth() - 3, 1)
          break
        case "thisYear":
          filterDate = new Date(now.getFullYear(), 0, 1)
          break
        default:
          filterDate = new Date(0)
      }

      filtered = filtered.filter((item) => {
        if (!item.parsedDate) return false
        return item.parsedDate >= filterDate
      })
    }

    // Apply sorting
    if (sortOrder === "oldest") {
      filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id))
    } else {
      filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
    }

    return filtered
  }, [items, sortOrder, timeFilter])

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

  // Optimized handlers
  const handleSortChange = useCallback((newSort: SortOrder) => {
    setSortOrder(newSort)
  }, [])

  const handleTimeFilterChange = useCallback((newFilter: TimeFilter) => {
    setTimeFilter(newFilter)
  }, [])

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev)
  }, [])

  // Optimized image loading with WebP support
  const getOptimizedImageSrc = useCallback((item: CsvItem) => {
    const imageBasePath = `/actividades/${section}`
    return `${imageBasePath}/${shortSection}-${item.id}/${shortSection}-${item.id}-1.webp`
  }, [section, shortSection])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>, item: CsvItem) => {
    const target = e.currentTarget
    const imageBasePath = `/actividades/${section}`
    
    if (target.src.includes(`${shortSection}-${item.id}`)) {
      // First fallback: try JPG version
      target.src = `${imageBasePath}/${shortSection}-${item.id}/${shortSection}-${item.id}-1.jpg`
    } else if (target.src.includes('.jpg')) {
      // Second fallback: general section image
      target.src = `${imageBasePath}/actividades_${section}.webp`
    } else if (target.src.includes(`actividades_${section}.webp`)) {
      // Third fallback: JPG version of section image
      target.src = `${imageBasePath}/actividades_${section}.jpg`
    } else {
      // Final fallback: placeholder
      target.src = `/placeholder.svg?height=192&width=384`
    }
  }, [section, shortSection])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#552673]"></div>
        <div className="ml-4 text-lg text-gray-600">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#552673] text-white rounded hover:bg-[#935da3] transition-colors duration-200"
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Optimized Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-shadow duration-200 hover:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#552673]" />
            <span className="font-medium text-[#552673]">Filtros</span>
            <button
              onClick={handleToggleFilters}
              className="text-sm text-gray-500 hover:text-[#552673] transition-colors duration-200 sm:hidden"
              aria-label={showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            >
              {showFilters ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 ${showFilters ? "block" : "hidden sm:flex"}`}>
            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={timeFilter}
                onChange={(e) => handleTimeFilterChange(e.target.value as TimeFilter)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#552673] focus:border-transparent transition-all duration-200"
                aria-label="Filtrar por tiempo"
              >
                <option value="all">Todas las fechas</option>
                <option value="thisWeek">Esta semana</option>
                <option value="thisMonth">Este mes</option>
                <option value="last3Months">Últimos 3 meses</option>
                <option value="thisYear">Este año</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-2">
              {sortOrder === "newest" ? (
                <SortDesc className="h-4 w-4 text-gray-500" />
              ) : (
                <SortAsc className="h-4 w-4 text-gray-500" />
              )}
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as SortOrder)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#552673] focus:border-transparent transition-all duration-200"
                aria-label="Ordenar por"
              >
                <option value="newest">Más recientes primero</option>
                <option value="oldest">Más antiguos primero</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-gray-600">
          Mostrando {filteredAndSortedItems.length} de {items.length} resultados
        </div>
      </div>

      {/* Optimized Results Grid */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-2">
              {items.length === 0 ? "No hay contenido disponible" : "No se encontraron resultados"}
            </div>
            <div className="text-sm text-gray-500">
              {items.length === 0
                ? "Próximamente agregaremos más actividades"
                : "Intenta ajustar los filtros para ver más resultados"}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedItems.map((item) => {
            const pagePath = `/actividades/${section}/${item.id}`

            return (
              <article
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link to={pagePath} className="block group">
                  <div className="relative overflow-hidden">
                    <img
                      src={getOptimizedImageSrc(item)}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => handleImageError(e, item)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#552673] mb-2 line-clamp-2 group-hover:text-[#935da3] transition-colors duration-200">
                      {item.title}
                    </h3>
                    {item.date && item.date !== "" && (
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={item.date}>{formatDate(item.date)}</time>
                      </p>
                    )}
                    <p className="text-gray-700 line-clamp-3 leading-relaxed">{item.short_desc}</p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SectionList