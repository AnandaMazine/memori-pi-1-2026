import jwt from "jsonwebtoken";
import jwtSecret from "../config/auth.js";

const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    jwt.verify(token, jwtSecret, (error, data) => {
      if (error) {
        return res.status(401).json({ error: "Token inválido" });
      }

      req.token = token;
      req.loggedUser = {
        id: data.id,
        email: data.email,
      };

      next();
    });

  } else {
    return res.status(401).json({ error: "Acesso não autorizado" });
  }
};

export default { Authorization };