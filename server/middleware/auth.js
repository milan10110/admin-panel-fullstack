import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "SignUp/LogIn Required" });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res
      .status(401)
      .cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({ message: "Invalid Token" });
  }
  return next();
};

export default verifyToken;
