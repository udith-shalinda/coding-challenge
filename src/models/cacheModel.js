import dynamoose from 'dynamoose'
import config from '../config/config.js'

// Define the cache schema
const cacheSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    data: {
      type: Object,
      required: true,
    },
    ttl: {
      type: Number,
      required: true,
      default: () => Math.floor(Date.now() / 1000) + 300, // Set TTL to 5 minutes (in seconds)
    },
  },
  { saveUnknown: true }
)

export const CacheModel = dynamoose.model(
  config.aws.userCacheTable,
  cacheSchema
)
