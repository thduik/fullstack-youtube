/**
 * Application constants
 */

const ROUTER_METHODS = {
  get: "get",
  post: "post",
  put: "put",
  patch: "patch",
  delete: "delete",
}

const HTTP_CODES = {
  ok: 200,
  created: 201,
  accepted: 202,
  unauthorized: 401,
  notFound: 404,
  badRequest: 400,
  forbidden: 403,
  notAllowed: 405,
  notAcceptable: 406,
  alreadyExists: 409,
  serverError: 500,
  notImplemented: 501,
}

const ERROR_NAMES = Object.keys(HTTP_CODES).reduce((obj, item) => {
  if (HTTP_CODES[item] >= 400) obj[item] = item
  return obj
}, {})

const ERROR_MSG = {
  [ERROR_NAMES.unauthorized]: "Not Authorized",
  [ERROR_NAMES.notFound]: "Not Found",
  [ERROR_NAMES.badRequest]: "Bad Request",
  [ERROR_NAMES.forbidden]: "Forbidden",
  [ERROR_NAMES.notAllowed]: "Not Allowed",
  [ERROR_NAMES.notAcceptable]: "Not Acceptable",
  [ERROR_NAMES.alreadyExists]: "Already Exists",
  [ERROR_NAMES.serverError]: "Server Error",
  [ERROR_NAMES.notImplemented]: "Not Implemented",
}

module.exports = {
  HTTP_CODES,
  ERROR_MSG,
  ERROR_NAMES,
  ROUTER_METHODS,
}
