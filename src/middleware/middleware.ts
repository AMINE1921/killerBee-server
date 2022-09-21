import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { getToken } from "../data/accessor/blacklistTokensAccessor";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  // Récupération du token
  const token = req.cookies.access_token;

  // Présence d'un token
  if (!token) {
    return res.status(401).json({ error: true, message: "Need a token" });
  }

  const isBlacklisted = await getToken(token);

  if (isBlacklisted) {
    return res.status(403).json({ error: true, message: "You are not authorized" });
  } else {
    // Véracité du token
    try {
      const decodedToken = <JwtPayload>jwt.verify(token, SECRET);
      req.userId = decodedToken.id;
      req.userFirstname = decodedToken.firstname;
      req.userLastname = decodedToken.lastname;
      req.userRoles = decodedToken.roles;
      return next();
    } catch {
      return res.status(401).json({ error: true, message: "Bad token" });
    }
  }
};

const hasAccessRole = (authorizedRoles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ error: true, message: "Need a token" });
    }

    let authorized = false;

    const isBlacklisted = await getToken(token);

    if (isBlacklisted) {
      return res.status(403).json({ error: true, message: "You are not authorized" });
    } else {
      try {
        const decodedToken = <JwtPayload>jwt.verify(token, SECRET);
        decodedToken.roles.map((role: string) => {
          if (authorizedRoles.includes(role)) {
            authorized = true;
          }
        });
        if (authorized) {
          req.userId = decodedToken.id;
          req.userFirstname = decodedToken.firstname;
          req.userLastname = decodedToken.lastname;
          req.userRoles = decodedToken.roles;
  
          return next();
        } else {
          return res.status(401).json({ error: true, message: "You are not authorized" });
        }
      } catch {
        return res.status(401).json({ error: true, message: "You are not authorized" });
      }
    }
    
  };
};

export { isLoggedIn, hasAccessRole };
