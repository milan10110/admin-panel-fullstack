import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  // console.log(req.cookies);
  const token =
    req.cookies.accessToken ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];

  // console.log(token);
  if (!token) {
    return res.status(403).send("SignUp/LogIn Required");
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
