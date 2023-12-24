// dbConfig.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lapbik", //Lapor Pelayanan Publik
});

module.exports = connection;
