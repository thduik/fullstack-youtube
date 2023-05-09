/**
 * Databases connector class
 * Should contain all db connection or multiple connections logic
 * Should be injected and used in Server class
 */
class DatabaseConnector {
  constructor() {
    // use env here from process env
  }

  /**
   * Creates database connection.
   * In case of multiple databases, split connections into separate methods
   */
  async connect() {
    // add connection here
    console.log("TODO: database connection")
  }

  // example methods
  // async connectMongo() {
  //   // add mongo/mongoose connect to database
  // }

  // async connectPG() {
  //   // add postgres connection
  // }

  // add more needed connections here
}

module.exports = DatabaseConnector
