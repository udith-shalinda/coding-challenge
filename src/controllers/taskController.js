import { v4 as uuidv4 } from 'uuid'
import { createTask } from '../services/taskServices.js'
/**
 * Create a new task and TODO generate a pre-signed URL for file upload.
 */
export const createTaskReq = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const id = uuidv4()
    const timestamp = Date.now()

    const task = {
      id,
      title,
      description,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    const responseTask = await createTask(task)

    res.status(201).json({ data: responseTask })
  } catch (error) {
    next(error)
  }
}
