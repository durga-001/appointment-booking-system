import jwt from "jsonwebtoken";

// Protects patient-only routes. Expects header: Authorization: Bearer <token>
const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized, please login again",
      });
    }

    const token = authHeader.split(" ")[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // attach identity to req instead of mutating req.body (safer, avoids
    // relying on the client to send userId themselves)
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
