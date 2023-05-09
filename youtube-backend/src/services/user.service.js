const { ERROR_NAMES } = require("../constants")
const { UserModel } = require("../models")

/**
 * Users Service
 */
class UserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  // Define db interactions models logic inside methods
  // There are few examples below

  /**
   * Get all users from database.
   * @returns Array<User>
   */
  async getAllUsers() {
    // const users = await this.userModel.find({})
    // return users
    return [] //mocked
  }

  /**
   * Find user in database by id
   * @param {String | Number} userId
   * @returns User
   */
  async getUserById(userId) {
    // const user = await this.userModel.findOneById(userId)
    // if (!user) throw new Error(ERROR_NAMES.notFound)
    // return user
    return {} //mocked
  }

  /**
   * Find user in database by email
   * @param {String} email
   * @returns User
   */
  async getUserByEmail(email) {
    // const user = await this.userModel.findOne({ email })
    // if (!user) throw new Error(ERROR_NAMES.notFound)
    // return user
    return {} //mocked
  }

  /**
   * Create new user in database
   * @param {Object} user
   * @returns User
   */
  async createUser(user) {
    // const createdUser = await this.userModel.create(user)
    // return user
    return {} //mocked
  }

  /**
   * Update user in database by id
   * @param {Object: {userId: String, updateObj: Object}} Object
   * @returns User
   */
  async updateUserById({ userId, updateObj }) {
    // mongo example
    // const user = this.userModel.findOneAndUpdate(
    //   { _id, userId },
    //   { ...updateObj },
    //   { new: true }
    // )
    // if (!user) throw new Error(ERROR_NAMES.notFound)
    // return user
    return {} //mocked
  }

  /**
   * Delete user by id
   * @param {String | Number} userId
   */
  async deleteUserById(userId) {
    // mongo example
    // await this.userModel.deleteOne({ _id: userId })
  }
}

module.exports = new UserService(UserModel) // export singleton instance
exports.UserService = UserService // export class for tests
