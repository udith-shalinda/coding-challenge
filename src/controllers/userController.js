import { fetchUsersFromAPI } from '../services/externalAPIService.js'

/**
 * Handle request to fetch user data.
 */
export const getUserById = async (req, res, next) => {
  try {
    const users = await fetchUsersFromAPI(req.params.id) // Fetch from API or cache
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
