import React, { useEffect, useState } from 'react';

interface Item {
  title: string;
  description: string;
  image: string;
}

interface SectionListProps {
  seccion: string; // Sección a consultar (talleres, hetc, conferencias)
}

const SectionList: React.FC<SectionListProps> = ({ seccion }) => {
  const [activityPhotos, setActivityPhotos] = useState<Item[]>([]);
  
  // URL del backend (ajusta según sea necesario)
  const backend_url = import.meta.env.VITE_BKEND_URL;

  useEffect(() => {
    // Realizamos el fetch al backend con el nombre de la sección
    const fetchData = async () => {
      try {
        const response = await fetch(`${backend_url}/api/actividades`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seccion }), // Enviamos la sección como parte de la solicitud
        });

        if (!response.ok) {
          throw new Error('Error al obtener actividades');
        }

        const data = await response.json();

        // Procesamos los datos de las actividades para agregar solo la primera foto
        const photos = data.reduce((acc: Item[], curr: any) => {
          const { datos, fotos } = curr;
          const { titulo_evento } = datos;

          // Verificamos si la foto para el evento ya ha sido añadida
          if (!acc.find(photo => photo.title === titulo_evento)) {
            const firstPhoto = Object.values(fotos)[0]; // Tomamos la primera foto
            acc.push({
              title: titulo_evento,
              description: datos.descripcion_corta, // Usamos la descripción corta
              image: `/actividades/${seccion}/${firstPhoto}.jpg`, // Ruta de la foto
            });
          }

          return acc;
        }, []);

        // Actualizamos el estado con las fotos procesadas
        setActivityPhotos(photos);

      } catch (error) {
        console.error('Error al obtener las actividades:', error);
      }
    };

    fetchData();
  }, [seccion]); // Cuando cambie la sección, realizamos nuevamente el fetch

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {activityPhotos.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-[#552673] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
