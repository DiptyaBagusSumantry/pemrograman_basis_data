const express = require("express");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const connection = require("./config/dbConfig.js");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

app.get('/', (req,res)=> {
  res.send('Running')
})

//sedder-admin
connection.query(
  `SELECT * FROM user where username = 'admin'`,
  async (error, results) => {
    if (error) throw error;
    if (results.length <= 0){
      const hashedPassword = await bcrypt.hash("admin1234", 10);
      connection.query(
        `INSERT INTO user (username, password) VALUES ('admin', '${hashedPassword}')`,
        async (error, results) => {
          if (error) throw error;
          console.log("success insert admin");
        }
      );
    }
  }
)

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
