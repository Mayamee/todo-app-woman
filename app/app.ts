import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { appPublicPath } from './utils/paths'
import authRouter from './routers/auth-router'
import todoRouter from './routers/api-router'
import catchErrorMiddleware from './middleware/catchError-middleware'
import { HOST, PORT, DB_CONNECTION_STRING, ORIGIN } from './env/env'

const app = express()

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.static(appPublicPath))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/todo', todoRouter)

app.use(catchErrorMiddleware)

main()

async function main() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING)
    app.listen(+PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
