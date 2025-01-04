import React from 'react'
import SectionList from '../components/SectionList'

const Conferencias = () => {
  const talleres = [
    {
      title: "Taller 1",
      subtitle: "Delineadores Caseros",
      description: "Aprende a hacer delineadores usando ingredientes naturales.",
      image: "/path-to-delineadores.jpg"
    },
    {
      title: "Taller 2",
      subtitle: "Arte en Agar",
      description: "Explora la creatividad en microbiología pintando en agar.",
      image: "/path-to-arte-agar.jpg"
    },
    // Agrega más talleres aquí...
  ]

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#552673] mb-6">Conferencias</h1>
      <SectionList items={talleres} />
    </div>
  )
}

export default Conferencias
