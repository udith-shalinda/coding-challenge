import dotenv from 'dotenv'

dotenv.config()

/**
 * Application configuration.
 */
export default {
  aws: {
    region: process.env.AWS_REGION,
    s3Bucket: process.env.S3_BUCKET,
    dynamoDBTable: process.env.DYNAMODB_TABLE,
  },
}
