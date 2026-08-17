import jwt from "jsonwebtoken";

// Protects admin-only routes.
const authAdmin = (req, res, next) => {
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

    if (token_decode.role !== "admin") {
      return res.json({ success: false, message: "Not Authorized as Admin" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
