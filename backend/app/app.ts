import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { appPublicPath } from './utils/filesystem/paths'
import authRouter from './routers/auth-router'
import todoRouter from './routers/todo-router'
import catchErrorMiddleware from './middleware/catchError-middleware'
import { HOST, PORT, DB_CONNECTION_STRING, ORIGIN } from './env/env'
import authMiddleware from './middleware/auth-middleware'

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
app.use('/api/v1/todo', authMiddleware, todoRouter)

app.use(catchErrorMiddleware)

main()
/**
 * @description Main function
 * @function main
 * @return {Promise<void>}
 */
async function main(): Promise<void> {
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
