"use client"

import type React from "react"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Calendar, Filter, SortAsc, SortDesc } from "lucide-react"
import { Link } from "react-router-dom" // Importar Link

interface CsvItem {
  id: string
  date: string
  title: string
  short_desc: string
  parsedDate?: Date
}

interface SectionListProps {
  section: string // talleres, hect, conferencias
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
    hect: "hetc",
    periodico: "news"
  }

  const shortSection = sectionMap[section] || section

  // Parse different date formats
  const parseDate = useCallback((dateString: string): Date | null => {
    if (!dateString) return null

    // Try different date formats
    const formats = [
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
    ]

    for (const format of formats) {
      if (format.test(dateString)) {
        let date: Date

        if (dateString.includes("-") && dateString.length === 10 && dateString.indexOf("-") === 4) {
          // YYYY-MM-DD format
          date = new Date(dateString)
        } else if (dateString.includes("/")) {
          // DD/MM/YYYY format
          const [day, month, year] = dateString.split("/")
          date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
        } else if (dateString.includes("-")) {
          // DD-MM-YYYY format
          const [day, month, year] = dateString.split("-")
          date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
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

  // Solo se ejecuta cuando cambia la sección, NO cuando cambian los filtros
  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`/registros/${section}.csv`, {
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

          const values = line.split(";").map((value) => value.trim())

          if (values.length >= 4 && values[0] && values[0] !== "") {
            const item: CsvItem = {
              id: values[0],
              date: values[1] || "",
              title: values[2] || "Sin título",
              short_desc: values[3] || "Sin descripción",
            }

            // Parse date for filtering (still needed for time filters)
            if (item.date) {
              const parsedDate = parseDate(item.date)
              if (parsedDate) {
                item.parsedDate = parsedDate
              }
            }

            data.push(item)
          }
        }

        // Ordenar inicialmente por ID (más recientes = ID más alto primero) al cargar los datos
        data.sort((a, b) => {
          return Number.parseInt(b.id) - Number.parseInt(a.id)
        })

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
      // Reset filters when section changes
      setSortOrder("newest") // Default to newest (highest ID)
      setTimeFilter("all")
    }
  }, [section, parseDate]) // Solo depende de section y parseDate

  // Filter and sort items - se ejecuta solo cuando cambian los filtros o items
  const filteredAndSortedItems = useMemo(() => {
    if (items.length === 0) return []

    let filtered = [...items]

    // Apply time filter (still uses parsedDate)
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
          filterDate = new Date(0) // Very old date
      }

      filtered = filtered.filter((item) => {
        if (!item.parsedDate) return false
        return item.parsedDate >= filterDate
      })
    }

    // Apply sorting based on ID
    if (sortOrder === "oldest") {
      filtered.sort((a, b) => {
        // Más antiguos primero (orden ascendente por ID)
        return Number.parseInt(a.id) - Number.parseInt(b.id)
      })
    } else {
      // "newest" (orden descendente por ID) - ya está ordenado así inicialmente, pero lo reconfirmamos
      filtered.sort((a, b) => {
        return Number.parseInt(b.id) - Number.parseInt(a.id)
      })
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

  // Handlers para evitar re-renders innecesarios
  const handleSortChange = useCallback((newSort: SortOrder) => {
    setSortOrder(newSort)
  }, [])

  const handleTimeFilterChange = useCallback((newFilter: TimeFilter) => {
    setTimeFilter(newFilter)
  }, [])

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev)
  }, [])

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
          className="px-4 py-2 bg-[#552673] text-white rounded hover:bg-[#935da3] transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#552673]" />
            <span className="font-medium text-[#552673]">Filtros</span>
            <button
              onClick={handleToggleFilters}
              className="text-sm text-gray-500 hover:text-[#552673] transition-colors sm:hidden"
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
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#552673] focus:border-transparent"
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
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#552673] focus:border-transparent"
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

      {/* Results */}
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
            const imageBasePath = `/actividades/${section}`
            // Construir la ruta de la página individual
            const pagePath = `/actividades/${section}/${item.id}`

            return (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={pagePath} className="block">
                  {" "}
                  {/* Envolver toda la tarjeta con Link */}
                  <img
                    src={`${imageBasePath}/${shortSection}-${item.id}/${shortSection}-${item.id}-1.jpg`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.currentTarget
                      // Primera imagen de respaldo: imagen general de la sección
                      if (target.src.includes(`${shortSection}-${item.id}`)) {
                        target.src = `${imageBasePath}/actividades_${section}.jpg`
                      } else if (target.src.includes(`actividades_${section}`)) {
                        // Segunda imagen de respaldo: placeholder
                        target.src = `/placeholder.svg?height=192&width=384`
                      }
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#552673] mb-2 line-clamp-2 hover:underline">
                      {item.title}
                    </h3>
                    {item.date && item.date !== "" && (
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.date)}
                      </p>
                    )}
                    <p className="text-gray-700 line-clamp-3">{item.short_desc}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SectionList
