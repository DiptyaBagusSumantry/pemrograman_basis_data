const connection = require("../config/dbConfig");
const moment = require("moment");
const { accesToken } = require("../helper/accessToken");

const tanggal = moment().format("YYYY-MM-DD");
const waktu = moment().format("HH:mm:ss");

class TindakanController {
  static async CreateTindakan(req, res) {
    const { status, keterangan, date, laporanId } = req.body;
    const user = accesToken(req, res);
     
    connection.query(
      `INSERT INTO tindakan (status, keterangan, date, laporan_id) VALUES ('${status}', '${keterangan}', '${date}', '${laporanId}' );`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        connection.query(
          `INSERT INTO logs (message, date, time, user_id) VALUES ('create tindakan', '${tanggal}', '${waktu}', '${user.id}');`
        );
        res.status(201).json(results);
      }
    );
  }
  static async GetTindakan(req, res) {
    connection.query("SELECT * FROM tindakan", (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results);
    });
  }
  static async UpdateTindakan(req, res) {
    const { status, keterangan, date } = req.body;
    const user = accesToken(req, res);
    connection.query(
      `UPDATE tindakan SET status = '${status}', keterangan = '${keterangan}', date = '${date}' WHERE id = ${req.params.id};`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        connection.query(
          `INSERT INTO logs (message, date, time, user_id) VALUES ('update tindakan', '${tanggal}', '${waktu}', '${user.id}');`
        );
        res.status(200).json(results);
      }
    );
  }
  static async DeleteTindakan(req, res) {
    const user = accesToken(req, res);
    connection.query(
      `DELETE FROM tindakan WHERE id = '${req.params.id}';`,
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        connection.query(
          `INSERT INTO logs (message, date, time, user_id) VALUES ('delete tindakan', '${tanggal}', '${waktu}', '${user.id}');`
        );
        res.status(200).json(results);
      }
    );
  }
}
module.exports = TindakanController;
