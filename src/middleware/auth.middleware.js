import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized. Missing token." });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Server misconfigured. Missing JWT_SECRET." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, email, iat, exp }

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Invalid or expired token." });
  }
}
