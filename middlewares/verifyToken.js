const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token && !req.cookies.accessToken) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'ACCESS_TOKEN_SECRET_saldsasaf65347244', (error, decoded) => {
    if (error) return res.sendStatus(403);
    req.username = decoded.username;
    next();
  });
}
module.exports = verifyToken