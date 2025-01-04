// config.js
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables del archivo .env

const {
  DB_URL: dbUrl = '',
  ORIGIN_URL: originUrl = '',
  PORT: port = '5000'
} = process.env;

// Exporta un objeto de configuración directamente
module.exports = {
  dbUrl,
  originUrl,
  port
};
