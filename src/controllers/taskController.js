import { v4 as uuidv4 } from 'uuid'
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskServices.js'
import { generateUploadUrl, deleteFile } from '../services/s3Services.js'
import config from '../config/config.js'
/**
 * Create a new task and generate a pre-signed URL for file upload.
 */
export const handleCreateTask = async (req, res, next) => {
  try {
    const { title, description, contentType } = req.body
    const id = uuidv4()
    const timestamp = Date.now()
    const fileKey = `tasks/${id}`
    const fileUrl = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/${fileKey}`
    const uploadUrl = await generateUploadUrl(fileKey, contentType)

    const task = {
      id,
      title,
      description,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
      fileUrl,
    }

    const responseTask = await createTask(task)

    res.status(201).json({ data: { ...responseTask, uploadUrl } })
  } catch (error) {
    next(error)
  }
}

/**
 * Handle fetching all tasks.
 */
export const handleGetAllTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks()
    res.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
}

/**
 * Handle fetching a task by ID.
 */
export const handleGetTaskById = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}

/**
 * Update a task and regenerate a pre-signed URL if needed.
 */
export const handleUpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { contentType, ...updates } = req.body

    if (contentType) {
      const fileKey = `tasks/${id}`
      updates.fileUrl = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/${fileKey}`
      updates.uploadUrl = await generateUploadUrl(fileKey, contentType)
    }

    const updatedTask = await updateTask(id, updates)
    res.status(200).json({ data: updatedTask })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete a task and its associated file from S3.
 */
export const handleDeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params

    const task = await getTaskById(id)
    if (task?.fileUrl) {
      const fileKey = task.fileUrl.split('/').pop()
      await deleteFile(fileKey)
    }

    await deleteTask(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
