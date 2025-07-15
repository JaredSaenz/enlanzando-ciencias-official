const express = require("express")
const path = require("path")

const app = express()
const port = process.env.PORT || 3000

// Sirve todos los archivos estáticos desde la carpeta 'dist'
// Esto incluye tu index.html, los bundles de JS/CSS y los archivos de la carpeta 'public'
// que Vite copia a 'dist' (como tus CSVs en 'dist/registros').
app.use(express.static(path.join(__dirname, "dist")))

// Para cualquier otra solicitud (rutas de tu aplicación React),
// sirve el index.html. React Router se encargará de la ruta en el cliente.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.get('/api/current-date', (req, res) => {
  res.json({
    currentDate: new Date().toISOString()
  });
  console.log(res)
});

// Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`)
})
