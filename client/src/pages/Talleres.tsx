import React, { useEffect, useState } from 'react';
import SectionList from '../components/SectionList';

const backend_url = import.meta.env.VITE_BKEND_URL;

const Talleres = () => {
  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const response = await fetch(`${backend_url}/api/talleres`, {
          method: 'POST', // Cambiar a POST
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}), // Enviar un cuerpo vacío por ahora
        });

        if (!response.ok) {
          throw new Error('Error al obtener los talleres');
        }

        const data = await response.json();

        // Transformar los datos para adaptarlos al formato esperado
        const formattedTalleres = data.map((taller) => ({
          title: taller.datos.titulo_evento, // Título del taller
          description: taller.datos.descripcion_corta, // Descripción corta
          image: `/actividades/talleres/${taller.fotos.nombre_foto_1}.jpg`, // Ruta de la primera foto
        }));

        setTalleres(formattedTalleres);
      } catch (error) {
        console.error('Error al obtener los talleres:', error);
      }
    };

    fetchTalleres();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#552673] mb-6">Talleres</h1>
      <SectionList items={talleres} />
    </div>
  );
};

export default Talleres;
