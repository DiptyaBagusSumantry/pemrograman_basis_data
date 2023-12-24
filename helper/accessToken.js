const jwt = require("jsonwebtoken");

function accesToken(req, res) {
  const token = jwt.verify(
      req.cookies.accessToken,
      "ACCESS_TOKEN_SECRET_saldsasaf65347244",
      (error, decoded) => {
        if (error) return res.sendStatus(403);
        return decoded;
      }
    );
  return token;
}

module.exports = { accesToken };
