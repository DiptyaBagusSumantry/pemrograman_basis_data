const connection = require("../config/dbConfig");
const { accesToken } = require("../helper/accessToken");
const moment = require("moment");

const tanggal = moment().format("YYYY-MM-DD");
const waktu = moment().format("HH:mm:ss");

class LaporController {
  static async CreateLapor(req, res) {
    const { location, description, date } = req.body;
    const user = accesToken(req, res);
    const code = (Math.random() + 1).toString(36).substring(7);
    // return res.send(code)
    connection.query(
      `INSERT INTO laporan (location, description, date, code_laporan, user_id) VALUES ('${location}', '${description}', '${date}', '${code}', '${user.id}' );`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        connection.query(
          `INSERT INTO logs (message, date, time, user_id) VALUES ('create laporan', '${tanggal}', '${waktu}', '${user.id}');`
        );
        res.status(201).json(results);
      }
    );
  }
  static async GetLapor(req, res) {
    const user = accesToken(req, res);
    const sorted = req.query.sorted || "";
    const searching = req.query.search || "";

    if (user.role !== "pelapor") {
      const query =
        "SELECT * FROM laporan WHERE code_laporan LIKE ? ORDER BY id " + sorted;
      connection.query(query, [`%${searching}%`], (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(200).json(results);
      });
    } else {
      const query =
        "SELECT * FROM laporan WHERE user_id = ? AND code_laporan LIKE ? ORDER BY id " +
        sorted;
      connection.query(query, [user.id, `%${searching}%`], (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(200).json(results);
      });
    }
  }
  static async DetailLaporan(req, res) {
    const user = accesToken(req, res);
    if (user.role != "pelapor") {
      connection.query(
        `SELECT laporan.*, tindakan.id AS tindakan_id, tindakan.status, tindakan.keterangan, tindakan.date AS tindakan_date FROM laporan JOIN tindakan ON laporan.id = tindakan.laporan_id WHERE code_laporan = '${req.params.code}' ORDER BY tindakan_id DESC;`,
        (error, results) => {
          if (error) {
            return res.status(400).json(error);
          }
          if (results.length <= 0) {
            return res.status(200).json({ msg: "Laporan Belum Ada Tindakan" });
          }
          return res.status(200).json(results);
        }
      );
    } else {
      connection.query(
        `SELECT laporan.*, tindakan.id AS tindakan_id, tindakan.status, tindakan.keterangan, tindakan.date AS tindakan_date FROM laporan JOIN tindakan ON laporan.id = tindakan.laporan_id WHERE user_id = '${user.id}' AND code_laporan = '${req.params.code}' ORDER BY tindakan_id DESC;`,
        (error, results) => {
          if (error) {
            return res.status(400).json(error);
          }
          if (results.length <= 0) {
            return res.status(200).json({ msg: "Laporan Belum Ada Tindakan" });
          }
          return res.status(200).json(results);
        }
      );
    }
  }
}

module.exports = LaporController;
