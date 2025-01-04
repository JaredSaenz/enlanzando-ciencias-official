import React, { useEffect, useState, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ChevronDown } from 'lucide-react';

const Actividades = () => {
  const [sections, setSections] = useState([]);
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://localhost:5000/api/actividades', {
        method: 'POST', // Cambiar de GET a POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // Enviar un objeto vacío o datos si es necesario
      });
      const data = await response.json();
      console.log(data);
      const groupedData = data.reduce((acc, curr) => {
        const { seccion, datos, fotos } = curr;
        const { titulo_evento } = datos;

        // Generar array de fotos dinámicamente
        const fotosArray = Object.values(fotos).map(nombre_foto => ({
          src: `/actividades/${seccion}/${nombre_foto}`,
          subtitle: titulo_evento
        }));

        if (!acc[seccion]) {
          acc[seccion] = {
            title: seccion.charAt(0).toUpperCase() + seccion.slice(1),
            description: datos.descripcion_larga,
            image: `/actividades_${seccion}.jpg`,
            photos: fotosArray
          };
        }
        return acc;
      }, {});

      setSections(Object.values(groupedData));
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{ backgroundImage: "url('/mesa_directiva_EC.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-4">
              Nuestras Actividades
            </h1>
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <div key={index} className="mb-24">
            {/* Main Section Content */}
            <AnimatedSection>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <img src={section.image} alt={section.title} className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <h2 className="text-4xl font-bold text-[#552673] mb-6 decoration-4">{section.title}</h2>
                  <p className="text-gray-700 text-lg">{section.description}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Photos Grid */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {section.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="flex flex-col items-center">
                    <img
                      src={photo.src}
                      alt={photo.subtitle}
                      className="w-full aspect-4/3 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold text-[#552673] hover:underline">
                      <a href="#" className="hover:text-[#935da3] transition-colors">{photo.subtitle}</a>
                    </h3>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actividades;
