import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  image: string;
  type: 'actividad' | 'divulgacion';
}

const sampleNews: NewsItem[] = [
  { id: 1, title: "Taller de química divertida", image: "/actividades_talleres.jpg", type: "actividad" },
  { id: 2, title: "Conferencia sobre cambio climático", image: "/actividades_conferencias.jpg", type: "actividad" },
  { id: 3, title: "Feria de ciencias en la comunidad", image: "/actividades_hetc.jpg", type: "actividad" },
  { id: 4, title: "Nuevo artículo: La importancia de la divulgación", image: "/divulgacion_ciencia.png", type: "divulgacion" },
  { id: 5, title: "Taller de robótica para principiantes", image: "/actividades_talleres.jpg", type: "actividad" },
  { id: 6, title: "Charla sobre inteligencia artificial", image: "/actividades_conferencias.jpg", type: "actividad" },
  { id: 7, title: "Experimentos científicos para niños", image: "/actividades_hetc.jpg", type: "actividad" },
  { id: 8, title: "Artículo: Descubrimientos científicos recientes", image: "/divulgacion_quimica.png", type: "divulgacion" },
  { id: 9, title: "Taller de astronomía básica", image: "/actividades_talleres.jpg", type: "actividad" },
  { id: 10, title: "Conferencia: El futuro de la energía renovable", image: "/actividades_conferencias.jpg", type: "actividad" },
  { id: 11, title: "Actividad comunitaria: Limpieza de playa", image: "/actividades_hetc.jpg", type: "actividad" },
  { id: 12, title: "Nuevo post: Mitos y realidades sobre vacunas", image: "/divulgacion_materia.jpg", type: "divulgacion" },
];

const NewsBar: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulate fetching and filtering news
    const filteredNews = sampleNews.filter(item => item.type === 'actividad').slice(-9);
    setNewsItems(filteredNews);
  }, []);

  const totalGroups = Math.ceil(newsItems.length / 3);

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  };

  const prevGroup = () => {
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#552673] mb-4">Últimas Noticias</h2>
        <div className="relative">
          <button onClick={prevGroup} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
            <ChevronLeft className="w-6 h-6 text-[#552673]" />
          </button>
          <div className="flex justify-between space-x-4 overflow-hidden">
            {newsItems.slice(currentGroup * 3, currentGroup * 3 + 3).map((item) => (
              <div key={item.id} className="w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#552673] truncate">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <button onClick={nextGroup} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
            <ChevronRight className="w-6 h-6 text-[#552673]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsBar;
