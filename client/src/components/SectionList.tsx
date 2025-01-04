import React, { useEffect, useState } from 'react';

interface Item {
  title: string;
  description: string;
  image: string;
}

interface SectionListProps {
  items: Item[];
}

const SectionList: React.FC<SectionListProps> = ({ items }) => {
  // Esta variable guarda las fotos organizadas para cada actividad
  const [activityPhotos, setActivityPhotos] = useState<Item[]>([]);

  useEffect(() => {
    // Este código asegura que solo agreguemos la primera foto de cada actividad
    const photos = [];
    items.forEach(item => {
      // Verificamos si la foto para el título ya ha sido añadida
      if (!photos.find(photo => photo.title === item.title)) {
        // Si no ha sido añadida, obtenemos la primera foto asociada a la actividad
        const firstPhoto = item.image;
        photos.push({
          title: item.title,
          description: item.description,
          image: firstPhoto, // Aquí estamos agregando la imagen asociada al título
        });
      }
    });

    // Actualizamos el estado con las fotos procesadas
    setActivityPhotos(photos);
  }, [items]);

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
