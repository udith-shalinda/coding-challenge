import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

const app = express()

app.use(express.json())
app.use('/api/tasks', taskRoutes)
app.use(errorMiddleware)

export default app
