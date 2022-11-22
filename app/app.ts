import express from 'express'
import dotenv from 'dotenv'
import { appDevEnvPath, appProdEnvPath, appPublicPath } from './utils/paths'
import apiRouter from './routers/api-router'
import catchErrorMiddleware from './middleware/catchError-middleware'
const mode = process.env.MODE || 'production'
dotenv.config({
  path: mode === 'development' ? appDevEnvPath : appProdEnvPath,
})

const app = express()
const PORT = process.env.PORT || '8080'
const HOST = process.env.HOST || 'localhost'

app.use(express.static(appPublicPath))

app.use('/api/v1/auth', apiRouter)
app.use(catchErrorMiddleware)

app.listen(+PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
