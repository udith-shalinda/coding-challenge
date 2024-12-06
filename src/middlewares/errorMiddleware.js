/**
 * Global error handling middleware.
 * @param {Error} err - Error object.
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 */
// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({ error: message })
}
