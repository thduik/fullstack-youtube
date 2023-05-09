// parse envs first
require("dotenv").config()
const Server = require("./src/server")
const DatabaseConnector = require("./src/db.connector")

/**
 * Entry app function
 */
;(async () => {
  try {
    const server = new Server(new DatabaseConnector())

    server.configure()
    await server.connectDB()
    server.listen()
  } catch (err) {
    console.error("Server Error", { err })
    process.exit(1)
  }
})()
