const connection = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const { accesToken } = require("../helper/accessToken");

async function IsAdmin(req, res, next) {
  try {
    const token = accesToken(req, res);
    connection.query(
      `SELECT * FROM user where id = '${token.id}'`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        if (results[0].role !== "admin") {
          return res.status(403).json({ msg: `Your role is not allowed!` });
        } else {
          next();
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: `roleChecker:\n ${error.message}` });
  }
}
async function IsPelapor(req, res, next) {
  try {
    const token = accesToken(req, res);
    connection.query(
      `SELECT * FROM user where id = '${token.id}'`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        if (results[0].role !== "pelapor") {
          return res.status(403).json({ msg: `Your role is not allowed!` });
        } else {
          next();
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: `roleChecker:\n ${error.message}` });
  }
}

module.exports = { IsAdmin, IsPelapor };
