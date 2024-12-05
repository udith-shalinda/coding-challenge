import { TaskModel } from '../models/taskModel.js'

/**
 * Create a new task.
 * @param {Object} task - Task data.
 * @returns {Promise<Object>} - The created task.
 */
export const createTask = async (task) => {
  const newTask = new TaskModel(task)
  return await newTask.save()
}

/**
 * Get a task by its ID.
 * @param {string} id - The ID of the task.
 * @returns {Promise<Object>} - The task with the given ID, or `null` if not found.
 */
export const getTaskById = async (id) => {
  return await TaskModel.get(id)
}

/**
 * Get all tasks.
 * @returns {Promise<Array>} - List of all tasks.
 */
export const getAllTasks = async () => {
  return await TaskModel.scan().exec()
}

/**
 * Update a task by its ID.
 * @param {string} id - The ID of the task.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<Object>} - The updated task.
 */
export const updateTask = async (id, updates) => {
  updates.updatedAt = Date.now()
  return await TaskModel.update({ id }, updates)
}

/**
 * Delete a task by its ID.
 * @param {string} id - The ID of the task.
 * @returns {Promise<void>} - Resolves when the task is deleted.
 */
export const deleteTask = async (id) => {
  await TaskModel.delete(id)
}
