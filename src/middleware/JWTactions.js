const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  let key = process.env.JWT_ACCESS_KEY;
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, key, (err, user) => {
      if (err) {
        res.status(403).json("token is not invalid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const requestRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json("you are not authenticated");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    const newAccessToken = jwt.sign(
      {
        id: user.id,
        name: user.fulltName,
        role: user.typeRole,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
    const newRefreshToken = jwt.sign(
      {
        id: user.id,
        name: user.fulltName,
        role: user.typeRole,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({ accessToken: newAccessToken });
  });
};

module.exports = {
  verifyToken,
  requestRefreshToken,
};
