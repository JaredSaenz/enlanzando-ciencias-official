const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const { dbUrl, originUrl, port } = require('./config.js');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = port || 5000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
});

// Middleware
const origin_url = `${originUrl}`;

app.use(cors({
    origin: origin_url
})); // Permitir solicitudes desde otros orígenes
app.use(express.json()); // Parsear solicitudes JSON

// Servir los archivos estáticos del frontend construido por Vite
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Capturar todas las demás rutas y devolver el index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use('/api', eventRoutes);

// Ruta de ejemplo
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

// Nueva ruta para obtener las actividades (ahora POST)
app.post('/api/actividades', async (req, res) => {
  try {
    const query = `
      WITH ranked_activities AS (
          SELECT 
              id,
              seccion,
              datos,
              fotos,
              ROW_NUMBER() OVER (PARTITION BY seccion ORDER BY created_at DESC) AS row_num
          FROM actividades
      )
      SELECT id, seccion, datos, fotos 
      FROM ranked_activities 
      WHERE row_num <= 3;
    `;
    const result = await pool.query(query);

    // Formatear los datos antes de enviarlos
    res.json(
      result.rows.map(row => ({
        id: row.id,
        seccion: row.seccion,
        datos: row.datos,
        fotos: row.fotos,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener actividades');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
