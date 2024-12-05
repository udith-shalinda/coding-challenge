import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

const app = express()

app.use(express.json())
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use(errorMiddleware)

export default app
