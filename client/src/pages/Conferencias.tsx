import React from 'react';
import SectionList from '../components/SectionList';

const Conferencias = () => {
  const backendUrl = import.meta.env.VITE_BKEND_URL;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#552673] mb-6">Conferencias</h1>
      <SectionList section="conferencias" backendUrl={backendUrl} />
    </div>
  );
};

export default Conferencias;
