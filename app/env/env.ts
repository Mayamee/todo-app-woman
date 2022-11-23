import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
import { appDevEnvPath, appProdEnvPath } from '../utils/paths'

const mode = process.env.MODE || 'production'
dotenv.config({
  path: mode === 'development' ? appDevEnvPath : appProdEnvPath,
})
const PORT = process.env.PORT || '8080'
const HOST = process.env.HOST || 'localhost'
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || ''
const ORIGIN = process.env.ORIGIN || `http://${HOST}:${PORT}`
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}
if (DB_CONNECTION_STRING === '') {
  throw new Error('DB_CONNECTION_STRING is not defined')
}

export { PORT, HOST, DB_CONNECTION_STRING, ORIGIN, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }
