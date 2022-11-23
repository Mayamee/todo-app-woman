import express from 'express'
import mongoose from 'mongoose'
import { appPublicPath } from './utils/paths'
import authRouter from './routers/auth-router'
import todoRouter from './routers/api-router'
import catchErrorMiddleware from './middleware/catchError-middleware'
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

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/todo', todoRouter)
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
