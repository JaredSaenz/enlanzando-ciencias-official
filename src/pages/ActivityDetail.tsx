"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Talleres from "./Talleres"
import HoyEnTuComunidad from "./HoyEnTuComunidad"
import Conferencias from "./Conferencias"
import DynamicPageRenderer from "../components/DynamicPageRenderer"
import { PageParser } from "../utils/pageParser"

// Componente de carga
const LoadingComponent = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#552673]"></div>
    <div className="ml-4 text-lg text-gray-600">Cargando actividad...</div>
  </div>
)

// Componente de error
const ErrorComponent = ({ group, id_page }: { group: string; id_page?: string }) => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-red-600">
    <div className="text-lg mb-4">
      {id_page ? `No se pudo cargar la actividad ${id_page} de ${group}.` : `No se pudo cargar la sección ${group}.`}
    </div>
    <Link to="/actividades" className="px-4 py-2 bg-[#552673] text-white rounded hover:bg-[#935da3] transition-colors">
      Volver a Actividades
    </Link>
  </div>
)

const ActivityDetail = () => {
  const { group, id_page } = useParams<{ group: string; id_page?: string }>()
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const loadPageData = async () => {
    setLoading(true)
    setError("")

    try {
      // Mapeo de grupos a carpetas
      const folderMap: Record<string, string> = {
        hetc: "hetcPages",
        talleres: "tallPages",
        conferencias: "confPages",
      }

      const folderName = folderMap[group]
      if (!folderName) {
        throw new Error(`Grupo no válido: ${group}`)
      }

      // Intentar cargar el archivo .txt
      const response = await fetch(`/pages/${folderName}/${id_page}.txt`)
      if (!response.ok) {
        throw new Error(`No se pudo cargar la página: ${response.status}`)
      }

      const content = await response.text()
      const parsedData = PageParser.parse(content)

      setPageData(parsedData)
    } catch (err) {
      console.error("Error loading page data:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      setPageData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id_page) {
      return
    }
    loadPageData()
  }, [group, id_page])

  if (!group) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-red-600">
        <div className="text-lg mb-4">Parámetros de ruta inválidos.</div>
        <Link
          to="/actividades"
          className="px-4 py-2 bg-[#552673] text-white rounded hover:bg-[#935da3] transition-colors"
        >
          Volver a Actividades
        </Link>
      </div>
    )
  }

  // Si no hay id_page, mostrar la página de listado del grupo
  if (!id_page) {
    switch (group) {
      case "talleres":
        return <Talleres />
      case "hetc":
        return <HoyEnTuComunidad />
      case "conferencias":
        return <Conferencias />
      default:
        return <ErrorComponent group={group} />
    }
  }

  if (loading) {
    return <LoadingComponent />
  }

  if (error || !pageData) {
    return <ErrorComponent group={group} id_page={id_page} />
  }

  return <DynamicPageRenderer metadata={pageData.metadata} components={pageData.components} />
}

export default ActivityDetail
