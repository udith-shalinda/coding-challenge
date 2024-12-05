import express from 'express'
import { createTaskReq } from '../controllers/taskController.js'
import { validateBody } from '../middlewares/validationMiddleware.js'
import { createTaskSchema } from '../validators/taskValidator.js'

const router = express.Router()

/**
 * Task API Routes.
 */
router.post('/', validateBody(createTaskSchema), createTaskReq)

export default router
