const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// Sirve los archivos estáticos desde la carpeta dist (generada por Vite)
app.use(express.static(path.join(__dirname, 'dist')))

// Maneja cualquier solicitud que no coincida con los archivos estáticos
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})