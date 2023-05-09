const { Router } = require("express")
const validationErrorsInterceptor = require("../interceptors/validation-errors.interceptor")

/**
 * Base Controller class.
 * Used for inheritance only
 */
class BaseController {
  constructor({ useValidatorErrCapture = false } = {}) {
    this.useValidatorErrCapture = useValidatorErrCapture
    this.router = Router()
  }

  /**
   * Common route handler wrapper with try-catch
   * In case of error, calls next() to pass error to express error handle middleware
   * @param {Function} asyncHandler async handler function
   * @returns Promise
   */
  withTryCatch(asyncHandler) {
    return async (req, res, next) => {
      try {
        return await asyncHandler(req, res, next)
      } catch (error) {
        console.error("Intercepted Error: ", { error })
        next(error)
      }
    }
  }

  /**
   * Create controller routes wrapped with try-catch
   * @param {Object} endpointsMap object with endpoints names, methods and handlers
   * Example of endpointsMap:
   *  {
   *    "/test": {method: "get", middlewares: [mwFn] handler: ()=> {}}
   *  }
   */
  initRoutes(endpointsMap = {}) {
    const _create = (name, endpointObj) => {
      const { method, middlewares = [], handler } = endpointObj
      const finalMiddlewares = this.useValidatorErrCapture
        ? [...middlewares, validationErrorsInterceptor]
        : middlewares

      this.router[method](
        name,
        ...finalMiddlewares,
        this.withTryCatch(handler.bind(this))
      )
    }

    for (const endpointName in endpointsMap) {
      if (Array.isArray(endpointsMap[endpointName])) {
        endpointsMap[endpointName].forEach((endpoint) => {
          _create(endpointName, endpoint)
        })
      } else {
        _create(endpointName, endpointsMap[endpointName])
      }
    }
  }

  get routes() {
    return this.router
  }
}

module.exports = BaseController
