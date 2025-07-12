import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import NewsBar from '../components/NewsBar';
import { ChevronDown } from 'lucide-react'; // Importamos el icono de flecha hacia abajo

const Home = () => {
  // Referencia para el contenido hacia donde nos desplazaremos
  const contentRef = useRef(null);

  // Asegurarse de que el SDK de Facebook cargue correctamente
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  // Función para desplazar la página hacia el contenido
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
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
              Bienvenidos a Enlazando Ciencias
            </h1>
            {/* Flecha que rebota y al hacer clic desplaza hacia el contenido */}
            <div className="animate-bounce text-white cursor-pointer" onClick={scrollToContent}>
              <ChevronDown className="h-10 w-10 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* News Bar */}
      <NewsBar />

      {/* Rest of the content */}
      <div ref={contentRef} className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#935da3] mb-6">¿Quiénes somos?</h2>
            <p className="text-gray-700 mb-6">
              Somos una agrupación estudiantil comprometida con la divulgación científica. Nuestro propósito es acercar el conocimiento científico a la sociedad de manera accesible y comprensible. A través de talleres, ferias de ciencia, conferencias y diversas actividades, buscamos inspirar a personas de todas las edades a explorar, aprender y apasionarse por la ciencia.
            </p>
            <p className="text-gray-700 mb-6">
              Estamos convencidos de que la ciencia debe ser compartida y comprendida por todos. Por ello, trabajamos para construir puentes entre el conocimiento académico y la comunidad. ¡Únete a nosotros en esta emocionante misión de compartir el saber!
            </p>
            <Link to="/quienes-somos" className="text-[#552673] font-semibold hover:text-[#935da3] transition duration-300">
              Leer más...
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#935da3] mb-6">Actividades</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Talleres', 'Conferencias', 'HETC'].map((activity, index) => (
                <div key={index} className="text-center">
                  <img src={`/inicio/${activity.toLowerCase()}_EC.jpg`} alt={activity} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <Link to="/actividades" className="text-[#552673] font-semibold hover:text-[#935da3] transition duration-300">
                    {activity}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#935da3] mb-6">¿Te interesa que realicemos alguna actividad en tu escuela?</h2>
            <p className="text-gray-700 mb-6">
              Si estás interesado en que acudamos a tu institución para realizar alguna feria de experimentos, taller, rally o actividad, ponte en contacto con nosotros. Estaremos encantados de llevar la ciencia a tu escuela.
            </p>
            <Link to="/contacto" className="inline-block bg-[#552673] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#935da3] transition duration-300">
              Contacto
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#935da3] mb-6">Síguenos en Facebook</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 overflow-hidden flex justify-center">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/Enlazando.ciencias"
                data-tabs="timeline"
                data-width="500"
                data-height="700"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="true"
                data-show-facepile="true">
                <blockquote cite="https://www.facebook.com/Enlazando.ciencias" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/Enlazando.ciencias">Enlazando Ciencias</a>
                </blockquote>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Home;
