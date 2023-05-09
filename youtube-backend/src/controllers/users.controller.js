const BaseController = require("./base.controller")
const userService = require("../services/user.service")
const { HTTP_CODES, ROUTER_METHODS } = require("../constants")
const { body } = require("express-validator")

/**
 * Users Controller
 */
class UsersController extends BaseController {
  constructor(userService) {
    super({ useValidatorErrCapture: true })

    this.userService = userService

    // use base controller build-in way to init routes and express router
    this.initRoutes({
      "/": [
        { method: ROUTER_METHODS.get, handler: this.getAllUsers },
        {
          method: ROUTER_METHODS.post,
          middlewares: [
            body("user").exists().isObject(), // Example. customize to more specific fields
          ],
          handler: this.createUser,
        },
      ],
      "/:userId": [
        {
          method: ROUTER_METHODS.get,
          middlewares: [
            /**add custom middlewares */
          ],
          handler: this.getUserById,
        },
        {
          method: ROUTER_METHODS.patch,
          middlewares: [
            /**add custom middlewares */
          ],
          handler: this.updateUserById,
        },
        { method: ROUTER_METHODS.delete, handler: this.deleteUserById },
      ],
    })
  }

  /**
   * Get all users
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async getAllUsers(req, res) {
    const users = await this.userService.getAllUsers()
    res.status(HTTP_CODES.ok).json(users)
  }

  /**
   * Get user by id
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async getUserById(req, res) {
    const { userId } = req.params
    const user = await this.userService.getUserById(userId)
    res.status(HTTP_CODES.ok).json(user)
  }

  /**
   * Create new user
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async createUser(req, res) {
    const { user } = req.body
    const newUser = await this.userService.createUser(user)
    res.status(HTTP_CODES.created).json(newUser)
  }

  /**
   * Update user by id
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async updateUserById(req, res) {
    const { userId } = req.params
    const { updateObj } = req.body
    const updatedUser = await this.userService.updateUserById({
      userId,
      updateObj,
    })
    res.status(HTTP_CODES.accepted).json(updatedUser)
  }

  /**
   * Delete user by id
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async deleteUserById(req, res) {
    const { userId } = req.params
    await this.userService.deleteUserById(userId)
    res.sendStatus(HTTP_CODES.accepted)
  }
}

module.exports = new UsersController(userService) // export singleton instance
exports.UsersController = UsersController // export class for tests
