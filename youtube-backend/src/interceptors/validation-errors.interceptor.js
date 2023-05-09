const { validationResult } = require("express-validator")

/**
 * Validation errors interceptor, which transforms error into api response with proper error message
 * @param {Error} err Error
 * @param {Express.req} req Express request
 * @param {Express.res} res Express response
 * @param {Express.next} next Express next
 */
const validationErrorsInterceptor = (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (errors && !errors.isEmpty()) {
      const [errObj] = errors.array({ onlyFirstError: true })

      console.log(`VALIDATION ${errObj.msg} ERROR: `, {
        notValidBodyProp: errObj.param,
        notValidPropValue: errObj.value,
        path: req.path,
        body: req.body,
      })

      return res.status(HTTP_CODES.badRequest).json(errObj)
    }

    return next()
  } catch (err) {
    console.log("UNHANDLED VALIDATION ERROR: ", err)
    res.sendStatus(HTTP_CODES.serverError)
  }
}

module.exports = validationErrorsInterceptor
