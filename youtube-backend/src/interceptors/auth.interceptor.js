/**
 * Auth Interceptor
 */

const authInterceptor = async (req, res, next) => {
  // add auth interceptor logic, depending on auth implementation
  next()
}

module.exports = authInterceptor
