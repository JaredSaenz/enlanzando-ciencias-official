import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Upload, Check } from 'lucide-react';

interface EventData {
  titulo_evento: string;
  descripcion_corta: string;
  descripcion_larga: string;
}

interface PhotoData {
  [key: string]: string;
}

const EventSubmissionForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [eventData, setEventData] = useState<EventData>({
    titulo_evento: '',
    descripcion_corta: '',
    descripcion_larga: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [section, setSection] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAuthenticated && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsAuthenticated(false);
    }
    return () => clearInterval(timer);
  }, [isAuthenticated, timeRemaining]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'your_password_here' with the actual password
    if (password === 'your_password_here') {
      setIsAuthenticated(true);
      setTimeRemaining(3600); // 1 hour in seconds
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const jpgFiles = files.filter(file => file.type === 'image/jpeg' || file.type === 'image/jpg');
    setPhotos(jpgFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const photoData: PhotoData = {};
    photos.forEach((photo, index) => {
      const nameWithoutExtension = photo.name.replace(/\.[^/.]+$/, "");
      photoData[`nombre_foto_${index + 1}`] = nameWithoutExtension;
    });

    const formData = new FormData();
    formData.append('datos', JSON.stringify(eventData));
    formData.append('fotos', JSON.stringify(photoData));
    formData.append('seccion', section);

    // Upload photos to GitHub (this is a placeholder, you'll need to implement the actual GitHub API call)
    for (let photo of photos) {
      formData.append('photo_files', photo);
    }

    try {
      const response = await fetch('/api/submit-event', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Evento enviado con éxito');
        navigate('/');
      } else {
        alert('Error al enviar el evento');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el evento');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-center text-primary">Acceso Restringido</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Lock className="absolute top-2 right-3 text-gray-400" size={20} />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">Enviar Nuevo Evento</h2>
      <p className="mb-4 text-gray-600">Tiempo restante: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo_evento" className="block mb-1 text-sm font-medium text-gray-700">
            Título del Evento
          </label>
          <input
            type="text"
            id="titulo_evento"
            name="titulo_evento"
            value={eventData.titulo_evento}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion_corta" className="block mb-1 text-sm font-medium text-gray-700">
            Descripción Corta
          </label>
          <input
            type="text"
            id="descripcion_corta"
            name="descripcion_corta"
            value={eventData.descripcion_corta}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion_larga" className="block mb-1 text-sm font-medium text-gray-700">
            Descripción Larga
          </label>
          <textarea
            id="descripcion_larga"
            name="descripcion_larga"
            value={eventData.descripcion_larga}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="photos" className="block mb-1 text-sm font-medium text-gray-700">
            Fotos (solo JPG/JPEG)
          </label>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="photos" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                <p className="text-xs text-gray-500">Solo archivos JPG/JPEG</p>
              </div>
              <input
                id="photos"
                type="file"
                accept=".jpg,.jpeg"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          {photos.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">{photos.length} foto(s) seleccionada(s)</p>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="section" className="block mb-1 text-sm font-medium text-gray-700">
            Sección
          </label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Selecciona una sección</option>
            <option value="talleres">Talleres</option>
            <option value="hetc">HETC</option>
            <option value="conferencias">Conferencias</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Enviar Evento
        </button>
      </form>
    </div>
  );
};

export default EventSubmissionForm;

