import express from 'express'
import { createTask } from '../controllers/taskController.js'
import { validateBody } from '../middlewares/validationMiddleware.js'
import { createTaskSchema } from '../validators/taskValidator.js'

const router = express.Router()

/**
 * Task API Routes.
 */
router.post('/', validateBody(createTaskSchema), createTask)

export default router
