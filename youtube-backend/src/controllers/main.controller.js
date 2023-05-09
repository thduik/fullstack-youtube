const { Router } = require("express")
const authController = require("./auth.controller")
const usersController = require("./users.controller")
const authInterceptor = require("../interceptors/auth.interceptor")

const mainController = Router()

// temporary test route
mainController.get("/test", (req, res) => {
  res.json({ ok: true })
})

/**
 * Main controller
 * Combines all sub-controllers
 */
mainController
  .use("/auth", authController.routes)
  .use("/users", authInterceptor, usersController.routes)

/**
 * Swagger Docs
 * in case of exposing swagger to prod, just remove if statement
 */
if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express")
  const swaggerDocument = require("../../swagger.json")

  mainController.use("/docs", swaggerUi.serve)
  mainController.get("/docs", swaggerUi.setup(swaggerDocument))
}

module.exports = mainController
