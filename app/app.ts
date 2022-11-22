import express from 'express'
import dotenv from 'dotenv'
import { appPublicPath } from './utils/paths'
import apiRouter from './routers/api-router'
import catchErrorMiddleware from './middleware/catchError-middleware'
import mongoose from 'mongoose'
import applyEnv from './env/applyEnv'
applyEnv()

const app = express()
const PORT = process.env.PORT || '8080'
const HOST = process.env.HOST || 'localhost'
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || ''
if (DB_CONNECTION_STRING === '') {
  console.error('DB_CONNECTION_STRING is not defined')
  process.exit(1)
}

app.use(express.static(appPublicPath))

app.use('/api/v1/auth', apiRouter)
app.use(catchErrorMiddleware)

main()

async function main() {
  try {
    // await mongoose.connect(DB_CONNECTION_STRING)
    app.listen(+PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
