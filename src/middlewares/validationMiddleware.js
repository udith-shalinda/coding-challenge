/**
 * Validation middleware for Yup schemas.
 * @param {Yup.ObjectSchema} schema - Yup validation schema.
 */
export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      details: error.errors,
    })
  }
}
