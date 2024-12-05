import { CacheModel } from '../models/cacheModel.js'

/**
 * Fetch user data from JSONPlaceholder and cache the result in DynamoDB.
 */
export const fetchUserFromAPI = async (id) => {
  // Check if the data exists in cache and is still valid (TTL not expired)
  const cachedData = await CacheModel.get(id)

  if (cachedData && cachedData.ttl > Math.floor(Date.now() / 1000)) {
    return cachedData.data
  }

  console.log('Cache miss: Fetching data from JSONPlaceholder')
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch users from JSONPlaceholder')
  }
  const data = await response.json()

  const newCacheData = new CacheModel({
    id,
    data,
  })

  await newCacheData.save()

  return data
}
