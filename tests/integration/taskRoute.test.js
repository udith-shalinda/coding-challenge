import request from 'supertest'
import app from '../../src/app.js'
import { createTask } from '../../src/services/taskServices.js'
import { generateUploadUrl } from '../../src/services/s3Services.js'

jest.mock('../../src/services/taskServices.js')
jest.mock('../../src/services/s3Services.js')

describe('Task Routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('POST /tasks - Should return validation error for invalid input', async () => {
    const invalidData = {
      title: 'A',
      description: 'Short',
      contentType: 'text/plain',
    }

    const response = await request(app).post('/api/tasks').send(invalidData)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Validation Error')
    expect(response.body.details).toEqual([
      'Title must be at least 3 characters long',
      'Description must be at least 10 characters long',
      'Invalid content type',
    ])
  })

  test('POST /tasks - Should succeed with valid input', async () => {
    const validData = {
      title: 'Valid Title',
      description: 'This is a valid description for the task.',
      contentType: 'image/png',
    }

    createTask.mockResolvedValue(validData)
    generateUploadUrl.mockResolvedValue('https://www.google.com/')

    const response = await request(app).post('/api/tasks').send(validData)
    expect(response.status).toBe(201)
  })

  test('POST /tasks - Should handle server error and return 500', async () => {
    const validData = {
      title: 'Valid Title',
      description: 'This is a valid description for the task.',
      contentType: 'image/png',
    }

    createTask.mockRejectedValue(new Error('Internal Server Error'))
    generateUploadUrl.mockResolvedValue('https://www.google.com/')

    const response = await request(app).post('/api/tasks').send(validData)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('error', 'Internal Server Error')
  })
})
