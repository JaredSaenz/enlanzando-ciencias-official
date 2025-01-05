import React, { useEffect, useState } from 'react';

interface Item {
  title: string;
  description: string;
  image: string;
}

interface SectionListProps {
  section: string; // Recibe la sección para consultar (talleres, hetc, conferencias)
  backendUrl: string;
}

const SectionList: React.FC<SectionListProps> = ({ section, backendUrl }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Consulta los eventos de la sección específica
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/actividades`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section }), // Enviamos la sección
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        const events = data
          .filter((event: any) => event.seccion === section) // Filtramos por la sección
          .map((event: any) => ({
            title: event.datos.titulo_evento,
            description: event.datos.descripcion_corta,
            image: `/actividades/${section}/${event.fotos.nombre_foto_1}.jpg`, // Usamos la primera foto
          }));

        setItems(events);
      } catch (err) {
        setError('Hubo un error al obtener los eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section, backendUrl]); // Dependencia para recargar cuando cambia la sección

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-[#552673] mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
