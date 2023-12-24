const connection = require("../config/dbConfig");

//Create Table User
const QueryUser = `
CREATE TABLE IF NOT EXISTS user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  telepon VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('admin','pelapor') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

connection.query(QueryUser, (err, results) => {
  if (err) throw err;

  console.log("Tabel users berhasil dibuat!");
});

//Create Table logs
const QueryLogs = `
  CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`; 

connection.query(QueryLogs, (err, results) => {
  if (err) throw err;

  console.log("Tabel Logs berhasil dibuat!");
});

//Create Table Laporan
const Querylaporan = `
  CREATE TABLE IF NOT EXISTS laporan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code_laporan char(7) NOT NULL,
    location VARCHAR(30) NOT NULL,
    description TEXT(1000) NOT NULL,
    date DATE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
  )
`;

connection.query(Querylaporan, (err, results) => {
  if (err) throw err;

  console.log("Tabel Laporan berhasil dibuat!");
});

//Create Table Tindakan
const QueryTindakan = `
  CREATE TABLE IF NOT EXISTS tindakan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status char(10) NOT NULL,
    keterangan TEXT(1000) NOT NULL,
    date DATE NOT NULL,
    laporan_id INT NOT NULL,
    FOREIGN KEY (laporan_id) REFERENCES laporan(id)
  )
`;

connection.query(QueryTindakan, (err, results) => {
  if (err) throw err;

  console.log("Tabel Tindakan berhasil dibuat!");
});
