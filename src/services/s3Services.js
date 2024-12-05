import AWS from 'aws-sdk'
import config from '../config/config.js'

const s3 = new AWS.S3({
  region: config.aws.region,
  signatureVersion: 'v4',
})

/**
 * Generate a pre-signed URL for uploading a file to S3.
 * @param {string} key - The file name or path in the S3 bucket.
 * @param {string} contentType - The MIME type of the file.
 * @returns {Promise<string>} - The pre-signed URL.
 */
export const generateUploadUrl = async (key, contentType) => {
  const params = {
    Bucket: config.aws.s3Bucket,
    Key: key,
    Expires: 300, // URL valid for 60 seconds
    ContentType: contentType,
  }
  return await s3.getSignedUrlPromise('putObject', params)
}

/**
 * Delete a file from S3.
 * @param {string} key - The file name or path in the S3 bucket.
 */
export const deleteFile = async (key) => {
  await s3
    .deleteObject({
      Bucket: config.aws.s3Bucket,
      Key: key,
    })
    .promise()
}
