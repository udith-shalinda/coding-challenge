import { object, string } from 'yup'

/**
 * Validation schema for task creation.
 */
export const createTaskSchema = object({
  title: string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters long'),
  description: string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  contentType: string()
    .required('Content type is required')
    .matches(/^(image|application)\/\w+$/, 'Invalid content type'),
})
