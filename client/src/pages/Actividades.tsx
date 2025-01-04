import React, { useEffect, useState, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ChevronDown } from 'lucide-react';

const backend_url = import.meta.env.VITE_BKEND_URL;

const Actividades = () => {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionsTitle = {
    talleres: 'Talleres',
    hetc: 'Hoy en tu comunidad',
    conferencias: 'Conferencias',
  };

  const sectionDescription = {
    talleres:
      'En Enlazando Ciencias ofrecemos talleres prácticos y creativos diseñados para acercar la ciencia a la vida cotidiana. Entre nuestras actividades destacan la elaboración de repelentes naturales, delineadores caseros, jabones artesanales y arte en agar, donde la biología y la creatividad se unen. Cada taller busca inspirar, enseñar y mostrar cómo la ciencia puede ser divertida y útil para todos. ¡Descubre la ciencia de una manera única con nosotros!',
    hetc:
      'En Enlazando Ciencias se enorgullece de participar en el programa "Hoy en tu Comunidad" de la UADY, llevando actividades de divulgación científica a comunidades. A través de dinámicas interactivas y educativas, buscamos despertar la curiosidad y fomentar el aprendizaje en niños, jóvenes y adultos. Nuestra labor refuerza el compromiso social de la universidad, conectando el conocimiento académico con las necesidades reales de la sociedad.',
    conferencias:
      'En Enlazando Ciencias impartimos conferencias dinámicas y educativas que abordan temas de interés científico y cotidiano. Algunas de nuestras charlas incluyen: "Cómo usar tu calculadora científica", "Antibióticos: ¿Amigos o enemigos?" y "El papel de la mujer en la investigación y divulgación científica". Cada conferencia busca informar, inspirar y generar reflexión sobre la importancia de la ciencia en nuestra vida diaria.',
  };

  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backend_url}/api/actividades`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        const groupedData = data.reduce((acc, curr) => {
          const { seccion, datos, fotos } = curr;
          const { titulo_evento } = datos;

          const fotosArray = Object.values(fotos).map((nombre_foto) => ({
            src: `/actividades/${seccion}/${nombre_foto}.jpg`,
            subtitle: titulo_evento,
          }));

          if (!acc[seccion]) {
            acc[seccion] = {
              title: sectionsTitle[seccion],
              description: sectionDescription[seccion],
              image: `/actividades_${seccion}.jpg`,
              photos: fotosArray,
            };
          }
          return acc;
        }, {});

        // Ordenar las secciones en el orden deseado
        const orderedSections = ['talleres', 'hetc', 'conferencias'].map(
          (key) => groupedData[key]
        );

        setSections(orderedSections);
      } catch (error) {
        console.error('Error al obtener las actividades:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/mesa_directiva_EC.jpg')",
        }}
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
            <AnimatedSection>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img
                    src={section.image}
                    alt={`Imagen de ${section.title}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div
                  className={`flex flex-col justify-center ${
                    index % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}
                >
                  <h2 className="text-4xl font-bold text-[#552673] mb-6">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 text-lg">{section.description}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {section.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="flex flex-col items-center">
                    <img
                      src={photo.src}
                      alt={`Foto de ${photo.subtitle}`}
                      className="w-full aspect-4/3 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold text-[#552673] hover:underline">
                      <a href="#" className="hover:text-[#935da3] transition-colors">
                        {photo.subtitle}
                      </a>
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
