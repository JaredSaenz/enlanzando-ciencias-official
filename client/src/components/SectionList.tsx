import React from 'react';

interface Item {
  title: string;
  description: string;
  image: string;
}

interface SectionListProps {
  items: Item[];
}

const SectionList: React.FC<SectionListProps> = ({ items }) => {
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
