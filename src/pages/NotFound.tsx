import type React from "react"
import { Link } from "react-router-dom"
import { Frown } from "lucide-react"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white text-[#552673] p-8 text-center">
      <Frown className="w-24 h-24 mb-6 text-[#935da3]" />
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Página No Encontrada</h2>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#552673] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#935da3] transition-colors text-lg"
      >
        Volver a Inicio
      </Link>
    </div>
  )
}

export default NotFound
