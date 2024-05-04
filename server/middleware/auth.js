import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Acess Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimleft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // If token is verfiied next is called which procceds to the next middleware or router. 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// The verifyToken middleware is used to authenticate and authorize users by verifying the validity of JWT tokens included in the request headers.
