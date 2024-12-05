import express from 'express'
import {
  handleCreateTask,
  handleGetTaskById,
  handleGetAllTasks,
  handleUpdateTask,
  handleDeleteTask,
} from '../controllers/taskController.js'
import { validateBody } from '../middlewares/validationMiddleware.js'
import { createTaskSchema } from '../validators/taskValidator.js'

const router = express.Router()

// create a task
router.post('/', validateBody(createTaskSchema), handleCreateTask)

// Get all tasks
router.get('/', handleGetAllTasks)

// Get a task by ID
router.get('/:id', handleGetTaskById)

// Update a task by ID
// TODO add middleware to verify the input
router.put('/:id', handleUpdateTask)

// Delete a task by ID
router.delete('/:id', handleDeleteTask)

export default router
