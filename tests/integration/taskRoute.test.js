import request from 'supertest'
import app from '../../src/app.js'

describe('Task Routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('POST /api/tasks - Should create a new task', async () => {
    const task = { title: 'Test Task', description: 'Description' }

    const response = await request(app).post('/api/tasks').send(task)
    expect(response.status).toBe(201)
    expect(response.body.task.name).toEqual(task.name)
    expect(response.body.task.status).toEqual('pending')
  })
})
