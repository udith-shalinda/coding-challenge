import AWS from 'aws-sdk'
import { generateUploadUrl, deleteFile } from '../../src/services/s3Services.js'

jest.mock('aws-sdk', () => {
  const mockS3Instance = {
    getSignedUrlPromise: jest.fn(),
    deleteObject: jest.fn().mockReturnValue({
      promise: jest.fn(), // Mock the promise method
    }),
  }

  return {
    S3: jest.fn(() => mockS3Instance),
  }
})

describe('S3Service', () => {
  let mockS3

  beforeEach(() => {
    mockS3 = new AWS.S3() // Use the mocked S3 instance
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('generateUploadUrl - Should return a pre-signed URL', async () => {
    const url = 'https://code-challenge-bucket.s3.amazonaws.com/tasks/test-key'
    mockS3.getSignedUrlPromise.mockResolvedValueOnce(url)

    const result = await generateUploadUrl('tasks/test-key', 'image/png')
    expect(result).toBe(url)
    expect(mockS3.getSignedUrlPromise).toHaveBeenCalledWith(
      'putObject',
      expect.objectContaining({
        Key: 'tasks/test-key',
        ContentType: 'image/png',
      })
    )
  })

  test('deleteFile - Should delete a file from S3', async () => {
    mockS3.deleteObject().promise.mockResolvedValueOnce()

    await deleteFile('tasks/test-key')
    expect(mockS3.deleteObject).toHaveBeenCalledWith({
      Bucket: expect.any(String),
      Key: 'tasks/test-key',
    })
  })
})
