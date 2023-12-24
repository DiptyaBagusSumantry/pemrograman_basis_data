const connection = require("../config/dbConfig");

class LogsController {
  static async GetLogs(req, res) {
    connection.query(
      "SELECT * FROM logs ORDER BY created_at DESC",
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(200).json(results);
      }
    );
  }
}
module.exports = LogsController;
