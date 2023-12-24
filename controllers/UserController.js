const connection = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async Login(req, res) {
    const { username, password } = req.body;

    //chek username
    connection.query(
      `SELECT * FROM user where username = '${username}'`,
      async (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        if (results.length <= 0)
          return res.status(400).json({ msg: "username tidak ditemukan" });

        const match = await bcrypt.compare(password, results[0].password);
        if (!match) return res.status(400).json({ msg: "password anda salah" });

        const accessToken = jwt.sign(
          {
            id: results[0].id,
            role: results[0].role,
          },
          "ACCESS_TOKEN_SECRET_saldsasaf65347244",
          {
            expiresIn: "480m",
          }
        );

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 8000,
          sameSite: "lax",
        });

        res.status(200).json({
          accessToken: accessToken,
        });
      }
    );
  }

  static async Logout(req, res) {
    const accessToken = req.cookies.accessToken;
    jwt.verify(
      accessToken,
      "ACCESS_TOKEN_SECRET_saldsasaf65347244",
      async (error, decoded) => {
        if (error) return res.sendStatus(403);
        res.clearCookie("accessToken");
        return res.sendStatus(200);
      }
    );
  }

  //PELAPOR

  static async GetPelapor(req, res) {
    connection.query(
      "SELECT * FROM user where role = 'pelapor'",
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(200).json(results);
      }
    );
  }

  static async RegisterPelapor(req, res) {
    const { name, telepon, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(`${password}`, 10);
    connection.query(
      `INSERT INTO user (name, telepon, username, password, role) VALUES ('${name}', '${telepon}', '${username}', '${hashedPassword}', 'pelapor' );`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(201).json(results);
      }
    );
  }

  static async UpdatePelapor(req, res) {
    const { name, telepon, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(`${password}`, 10);
    connection.query(
      `UPDATE user SET name = '${name}', telepon = '${telepon}', username = '${username}', password = '${hashedPassword}', role = 'pelapor' WHERE id = ${req.params.id} AND role = 'pelapor';`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(200).json(results);
      }
    );
  }

  static async DeletePelapor(req, res) {
    connection.query(
      `DELETE FROM user WHERE id = '${req.params.id}' AND role = 'pelapor';`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(200).json(results);
      }
    );
  }
}

module.exports = UserController;
