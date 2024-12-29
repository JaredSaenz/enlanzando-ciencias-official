import React from 'react'

const Home = () => {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-[#552673] sm:text-5xl md:text-6xl">
              Bienvenidos a Enlazando Ciencias
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Somos una sociedad estudiantil dedicada a conectar diferentes disciplinas científicas para fomentar la innovación y el conocimiento interdisciplinario.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/unete"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#935da3] hover:bg-[#c5a1cc] md:py-4 md:text-lg md:px-10"
                >
                  Únete a nosotros
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="/actividades"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#552673] bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Ver actividades
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Home
  
  