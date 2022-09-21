import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  getUserByEmail,
  createUser,
} from "../data/accessor/userAccessor";
import { blacklistToken } from "../data/accessor/blacklistTokensAccessor";
import jwt from "jsonwebtoken";
import UserInterface from "../interfaces/userInterface";
import connexionLogger from "../utils/connexionLogger";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

const capitalizeFirstLetter = (string: string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

const validatePassword = (password: string) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return re?.test(password);
};

const login = async (req: Request, res: Response) => {
  const { mail, password } = req.body;

  const user = await getUserByEmail(mail);

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res
          .status(500)
          .json({ error: true, message: "Something went wrong" });
      } else if (result) {
        const token = jwt.sign(
          {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: user.roles,
          },
          SECRET,
          { expiresIn: "365d" }
        );

        connexionLogger.log({
          level: "info",
          message: mail,
          date: new Date(Date.now()).toUTCString(),
        });
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 720,
          })
          .status(200)
          .json({ success: true, message: "Logged in successfully" });
      } else {
        connexionLogger.log({
          level: "error",
          message: mail,
          date: new Date(Date.now()).toUTCString(),
        });
        return res
          .status(400)
          .json({ error: true, message: "Wrong login or password" });
      }
    });
  } else {
    connexionLogger.log({
      level: "error",
      message: mail,
      date: new Date(Date.now()).toUTCString(),
    });
    return res
      .status(400)
      .json({ error: true, message: "Wrong login or password" });
  }
};

const register = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);
  const { firstname, lastname, mail, password } = req.body;
  const role = "operator";

  if (validatePassword(password)) {
    await bcrypt.hash(password, salt, (error: any, hash: string) => {
      if (error) {
        return res.status(500).json({ error: true, message: error });
      } else {
        try {
          const newUser: UserInterface = {
            firstname: capitalizeFirstLetter(firstname),
            lastname: capitalizeFirstLetter(lastname),
            password: hash,
            mail: mail,
            roles: [role]
          };

          createUser(newUser)
            .then(() => {
              return res
                .status(200)
                .json({ success: true, message: "User created" });
            })
            .catch((error) => {
              return res
                .status(500)
                .json({ error: true, message: error.message });
            });
        } catch (error: any) {
          console.log("error: ", error);
          return res
            .status(500)
            .json({ error: true, message: "Something went wrong" });
        }
      }
    });
  } else {
    return res
      .status(403)
      .json({ error: true, message: "Password is not strong enough" });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token;

    await blacklistToken(token);

    return res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "Successfully logged out" });
  } catch (err: any) {
    return res.status(500).json({ error: true, message: err });
  }
};

const protect = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "",
    user: {
      id: req.userId,
      firstname: req.userFirstname,
      lastname: req.userLastname,
      roles: req.userRoles,
    },
  });
};

export { login, register, logout, protect };
