const BaseController = require("./base.controller")
const authService = require("../services/auth.service")
const { ROUTER_METHODS, HTTP_CODES } = require("../constants")

/**
 * Auth Controller
 */
class AuthController extends BaseController {
  constructor(authService) {
    super({ useValidatorErrCapture: true })
    this.authService = authService

    // use base controller build-in way to init routes and express router
    this.initRoutes({
      "/signin": {
        method: ROUTER_METHODS.post,
        /*add validations middleware */ handler: this.signin,
      },
      "/signup": {
        method: ROUTER_METHODS.post,
        /*add validations middleware */ handler: this.signup,
      },
    })
  }

  async signin(req, res) {
    // add signin logic
    res.sendStatus(HTTP_CODES.notImplemented)
  }

  async signup(req, res) {
    // add signup logic
    res.sendStatus(HTTP_CODES.notImplemented)
  }
}

module.exports = new AuthController(authService) // export singleton instance
exports.AuthController = AuthController // export class for tests
