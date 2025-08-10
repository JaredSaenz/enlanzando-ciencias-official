import { useParams } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Link } from "react-router-dom"

// Componente de carga
const LoadingComponent = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#552673]"></div>
    <div className="ml-4 text-lg text-gray-600">Cargando actividad...</div>
  </div>
)

// Componente de error
const ErrorComponent = ({ group, id_page }: { group: string; id_page: string }) => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-red-600">
    <div className="text-lg mb-4">
      No se pudo cargar la actividad {id_page} de {group}.
    </div>
    <Link
      to={`/actividades/${group}`}
      className="px-4 py-2 bg-[#552673] text-white rounded hover:bg-[#935da3] transition-colors"
    >
      Volver a {group}
    </Link>
  </div>
)

const ActivityDetail = () => {
  const { group, id_page } = useParams<{ group: string; id_page: string }>()

  if (!group || !id_page) {
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

  // Mapeo de grupos a carpetas
  const folderMap: Record<string, string> = {
    hetc: "hetcPages",
    talleres: "tallPages",
    conferencias: "confPages",
  }

  const folderName = folderMap[group]

  if (!folderName) {
    return <ErrorComponent group={group} id_page={id_page} />
  }

  // Carga dinámica del componente
  let PageComponent
  try {
    PageComponent = lazy(() =>
      import(`./${folderName}/${id_page}.tsx`).catch(() => {
        // Si falla la importación, devolver un componente de error
        return {
          default: () => <ErrorComponent group={group} id_page={id_page} />,
        }
      }),
    )
  } catch (error) {
    return <ErrorComponent group={group} id_page={id_page} />
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <PageComponent />
    </Suspense>
  )
}

export default ActivityDetail