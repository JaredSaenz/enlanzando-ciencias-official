const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permitir solicitudes desde otros orígenes
app.use(express.json()); // Parsear solicitudes JSON

// Servir los archivos estáticos del frontend construido por Vite
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Rutas de la API (puedes añadir tus propias rutas aquí)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

// Capturar todas las demás rutas y devolver el index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
