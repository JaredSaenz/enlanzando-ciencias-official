// config.js
import dotenv from 'dotenv';


dotenv.config(); // Carga las variables del archivo .env

const {
  DB_URL: dbUrl = '',
  GITHUB_TOKEN: gitToken = '',
  ORIGIN_URL: originUrl = '',
  PORT: port = '5000'
} = process.env;

export const EnvConfig = () => ({
  dbUrl,
  gitToken,
  originUrl,
  port
});
