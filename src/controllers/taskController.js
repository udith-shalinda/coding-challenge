import { v4 as uuidv4 } from 'uuid'

/**
 * Create a new task and TODO generate a pre-signed URL for file upload.
 */
export const createTask = async (req, res, next) => {
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

    res.status(201).json({ task })
  } catch (error) {
    next(error)
  }
}
