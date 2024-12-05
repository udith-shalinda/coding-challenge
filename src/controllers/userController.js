import { fetchUserFromAPI } from '../services/externalAPIService.js'

/**
 * Handle request to fetch user data.
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await fetchUserFromAPI(req.params.id) // Fetch from API or cache
    res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}
