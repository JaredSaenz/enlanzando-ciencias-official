import type React from "react"
import { useEffect, useState } from "react"

interface CsvItem {
  id: string
  date: string
  title: string
  short_desc: string
}

interface SectionListProps {
  section: string // talleres, hect, conferencias
}

const SectionList: React.FC<SectionListProps> = ({ section }) => {
  const [items, setItems] = useState<CsvItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch(`/registros/${section}.csv`)

        if (!response.ok) {
          throw new Error("Error al cargar el archivo CSV")
        }

        const csvText = await response.text()

        // Parse CSV manually since it uses semicolons as separators
        const lines = csvText.trim().split("\n")
        const headers = lines[0].split(";").map((header) => header.trim())

        const data: CsvItem[] = []
        console.log(data)

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(";").map((value) => value.trim())

          if (values.length >= 4 && values[0]) {
            // Ensure we have all required fields and id is not empty
            data.push({
              id: values[0],
              date: values[1],
              title: values[2],
              short_desc: values[3],
            })
          }
        }

        setItems(data)
      } catch (err) {
        setError("Hubo un error al cargar los datos")
        console.error("Error loading CSV:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCsvData()
  }, [section])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">No hay datos disponibles</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => {
        // Mapeo de secciones a sus versiones cortas
        const sectionMap: Record<string, string> = {
          talleres: "tall",
          conferencias: "conf",
          hetc: "hetc"
        };
        
        const shortSection = sectionMap[section] || section;
        const imageBasePath = `/actividades/${section}`;

        return (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={`${imageBasePath}/${shortSection}-${item.id}/${shortSection}-${item.id}-1.jpg`}
              alt={item.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Imagen de respaldo si falla la carga
                e.currentTarget.src = `${imageBasePath}/default.jpg`;
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#552673] mb-2">{item.title}</h3>
              {item.date && <p className="text-sm text-gray-500 mb-2">{item.date}</p>}
              <p className="text-gray-700">{item.short_desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default SectionList
